import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { ChatSession } from "./DemoChatWidget";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface DemoChatWindowProps {
  session: ChatSession;
  onNewMessage?: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/demo-chat`;

const DemoChatWindow = ({ session, onNewMessage }: DemoChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Send initial greeting
  useEffect(() => {
    const sendGreeting = async () => {
      setIsLoading(true);
      
      const clinicTypeLabels: Record<string, string> = {
        fertility: "fertility services",
        med_spa: "med spa treatments",
        regenerative: "regenerative medicine",
        other: "our services",
      };

      const greetingMessages = [
        {
          role: "user" as const,
          content: `Hi, I'm interested in learning more about ${clinicTypeLabels[session.clinicType]}.`,
        },
      ];

      try {
        let assistantContent = "";

        await streamChat({
          messages: greetingMessages,
          sessionId: session.id,
          clinicType: session.clinicType,
          visitorName: session.visitorName,
          onDelta: (chunk) => {
            assistantContent += chunk;
            setMessages([
              {
                id: "greeting",
                role: "assistant",
                content: assistantContent,
              },
            ]);
          },
          onDone: async () => {
            // Save the greeting to database via edge function
            await saveMessage(session.id, assistantContent, "assistant");
            setIsLoading(false);
            inputRef.current?.focus();
            onNewMessage?.();
          },
        });
      } catch (error) {
        console.error("Error sending greeting:", error);
        setMessages([
          {
            id: "greeting",
            role: "assistant",
            content: `Hi ${session.visitorName}! Welcome to Cima Fertility Clinic. I'm here to help you learn about our services and answer any questions. What brings you in today?`,
          },
        ]);
        setIsLoading(false);
      }
    };

    sendGreeting();
  }, [session]);

  // Helper to save messages via edge function (server-side)
  const saveMessage = async (sessionId: string, content: string, role: "user" | "assistant") => {
    try {
      const body = role === "user" 
        ? { sessionId, userMessage: content }
        : { sessionId, saveAssistantMessage: content };
        
      await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const streamChat = async ({
    messages,
    sessionId,
    clinicType,
    visitorName,
    userMessage,
    onDelta,
    onDone,
  }: {
    messages: { role: "user" | "assistant"; content: string }[];
    sessionId: string;
    clinicType: string;
    visitorName: string;
    userMessage?: string;
    onDelta: (deltaText: string) => void;
    onDone: () => void;
  }) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, sessionId, clinicType, visitorName, userMessage }),
    });

    if (!resp.ok || !resp.body) {
      throw new Error("Failed to start stream");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore */
        }
      }
    }

    onDone();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, userMsg]);

    const messagesForApi = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    try {
      await streamChat({
        messages: messagesForApi,
        sessionId: session.id,
        clinicType: session.clinicType,
        visitorName: session.visitorName,
        userMessage, // This will be saved server-side
        onDelta: (chunk) => {
          assistantContent += chunk;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && last.id === assistantId) {
              return prev.map((m) =>
                m.id === assistantId ? { ...m, content: assistantContent } : m
              );
            }
            return [...prev, { id: assistantId, role: "assistant", content: assistantContent }];
          });
        },
        onDone: async () => {
          // Save assistant message via edge function (server-side)
          await saveMessage(session.id, assistantContent, "assistant");
          setIsLoading(false);
          onNewMessage?.();
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={scrollRef}>
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-accent-orange text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-accent-orange text-white rounded-tr-sm"
                      : "bg-accent text-foreground rounded-tl-sm"
                  }`}
                >
                  <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-p:leading-relaxed prose-strong:text-inherit prose-em:text-inherit prose-headings:text-inherit prose-a:text-accent-orange prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-accent rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border flex-shrink-0">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-11"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="hero"
            size="icon"
            className="h-11 w-11 flex-shrink-0"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DemoChatWindow;
