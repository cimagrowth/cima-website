import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoChatForm from "./DemoChatForm";
import DemoChatWindow from "./DemoChatWindow";

export interface ChatSession {
  id: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  clinicType: "fertility" | "med_spa" | "regenerative" | "other";
}

const DemoChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [showPulse, setShowPulse] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useEffect(() => {
    // Stop the pulse animation after first interaction
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  const handleSessionCreated = (newSession: ChatSession) => {
    setSession(newSession);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setHasUnreadMessages(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
    setHasUnreadMessages(false);
  };

  const handleNewMessage = () => {
    if (isMinimized) {
      setHasUnreadMessages(true);
    }
  };

  return (
    <>
      {/* Floating Chat Button - positioned on the right side, vertically centered */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="relative">
              {showPulse && (
                <motion.div
                  className="absolute inset-0 rounded-l-full bg-accent-orange"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <Button
                onClick={() => setIsOpen(true)}
                variant="hero"
                className="h-auto py-4 px-3 rounded-l-xl rounded-r-none shadow-glow flex flex-col gap-2 items-center"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs font-medium writing-mode-vertical" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                  Try AI Bot
                </span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat Bar */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleExpand}
              variant="hero"
              className="h-14 px-4 rounded-full shadow-glow flex items-center gap-3 relative"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
                <MessageCircle className="h-4 w-4 text-white" />
                {hasUnreadMessages && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-accent-orange rounded-full border-2 border-primary"
                  />
                )}
              </div>
              <span className="font-medium">
                {hasUnreadMessages ? "New message" : "Continue Chat"}
              </span>
              <Maximize2 className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window - positioned on the right side, vertically centered */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-glow overflow-hidden flex flex-col overscroll-contain"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-secondary flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cima AI Assistant</h3>
                  <p className="text-xs text-white/80">Demo Mode • Not a real clinic</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMinimize}
                  className="text-white hover:bg-white/20"
                  title="Minimize chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden min-h-0">
              {!session ? (
                <DemoChatForm onSessionCreated={handleSessionCreated} />
              ) : (
                <DemoChatWindow session={session} onNewMessage={handleNewMessage} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoChatWidget;
