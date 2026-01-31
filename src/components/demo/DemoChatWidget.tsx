import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
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
  const [session, setSession] = useState<ChatSession | null>(null);
  const [showPulse, setShowPulse] = useState(true);

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
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative">
              {showPulse && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent-orange"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <Button
                onClick={() => setIsOpen(true)}
                variant="hero"
                size="icon"
                className="h-14 w-14 rounded-full shadow-glow"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
            >
              <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-card text-sm text-foreground">
                <span className="font-medium">Try the AI bot!</span>
                <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-card border border-border rounded-2xl shadow-glow overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cima AI Assistant</h3>
                  <p className="text-xs text-white/80">Demo Mode • Not a real clinic</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {!session ? (
                <DemoChatForm onSessionCreated={handleSessionCreated} />
              ) : (
                <DemoChatWindow session={session} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoChatWidget;
