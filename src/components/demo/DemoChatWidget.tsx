import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisitor } from "@/contexts/VisitorContext";
import DemoChatForm from "./DemoChatForm";
import DemoChatWindow from "./DemoChatWindow";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-demo-chat`;
const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export interface ChatSession {
  id: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  businessName: string;
  clinicType: "fertility" | "med_spa" | "regenerative" | "other";
}

const DemoChatWidget = () => {
  const { setVisitor } = useVisitor();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [showPulse, setShowPulse] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const sessionEndedRef = useRef(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    // Stop the pulse animation after first interaction
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  // End session and trigger webhook
  const endSession = useCallback(async (sessionToEnd: ChatSession) => {
    if (sessionEndedRef.current) return; // Prevent duplicate calls
    sessionEndedRef.current = true;

    // Clear inactivity timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    const payload = JSON.stringify({
      action: "end_session",
      sessionId: sessionToEnd.id,
    });

    console.log("Ending session:", sessionToEnd.id);

    try {
      // Use fetch with keepalive for reliability (works better than sendBeacon for JSON APIs)
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        keepalive: true, // Ensures request completes even if page unloads
      });

      if (response.ok) {
        console.log("Session ended and webhook sent successfully");
      } else {
        const errorText = await response.text();
        console.error("End session failed:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error ending session:", error);
      
      // Fallback to sendBeacon as last resort
      try {
        navigator.sendBeacon?.(
          CHAT_URL,
          new Blob([payload], { type: "application/json" })
        );
        console.log("Session end sent via sendBeacon fallback");
      } catch (beaconError) {
        console.error("sendBeacon fallback also failed:", beaconError);
      }
    }
  }, []);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Only set timer if we have an active session
    if (session && !sessionEndedRef.current) {
      inactivityTimerRef.current = setTimeout(() => {
        console.log("Inactivity timeout reached, ending session");
        if (session && !sessionEndedRef.current) {
          endSession(session);
        }
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [session, endSession]);

  // Handle page unload/visibility change
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (session && !sessionEndedRef.current) {
        sessionEndedRef.current = true;
        const payload = JSON.stringify({
          action: "end_session",
          sessionId: session.id,
        });
        
        // Use fetch with keepalive - more reliable than sendBeacon for JSON APIs
        fetch(CHAT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // Fallback to sendBeacon
          navigator.sendBeacon?.(
            CHAT_URL,
            new Blob([payload], { type: "application/json" })
          );
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && session && !sessionEndedRef.current) {
        // User switched tabs or minimized browser - end session
        endSession(session);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [session, endSession]);

  // Start inactivity timer when session is created
  useEffect(() => {
    if (session && !sessionEndedRef.current) {
      resetInactivityTimer();
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [session, resetInactivityTimer]);

  const handleSessionCreated = (newSession: ChatSession) => {
    setSession(newSession);
    sessionEndedRef.current = false; // Reset for new session
    lastActivityRef.current = Date.now();
    
    // Store visitor data for personalization
    setVisitor({
      businessName: newSession.businessName,
      visitorName: newSession.visitorName,
    });
  };

  const handleClose = async () => {
    // End the session and send webhook when chat is closed
    if (session && !sessionEndedRef.current) {
      await endSession(session);
    }
    setIsOpen(false);
    setIsMinimized(false);
    setHasUnreadMessages(false);
    setSession(null); // Clear session so next open starts fresh
  };

  const handleMinimize = async () => {
    // End session when minimizing (user going to "continue chat" mode)
    if (session && !sessionEndedRef.current) {
      await endSession(session);
    }
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
    setHasUnreadMessages(false);
  };

  const handleNewMessage = () => {
    // Reset inactivity timer on new message
    resetInactivityTimer();
    
    if (isMinimized) {
      setHasUnreadMessages(true);
    }
  };

  return (
    <>
      {/* Floating Chat Button - positioned on the right side, vertically centered */}
      {/* Shows when closed OR when minimized (minimizes back to sidebar) */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
            style={{ transformOrigin: "right center" }}
          >
            <div className="relative">
              {/* Pulse animation only when not yet opened */}
              {showPulse && !isMinimized && (
                <motion.div
                  className="absolute inset-0 rounded-l-full bg-accent-orange"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {/* Unread indicator when minimized */}
              {isMinimized && hasUnreadMessages && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent-orange rounded-full border-2 border-white z-10"
                />
              )}
              <Button
                onClick={isMinimized ? handleExpand : () => setIsOpen(true)}
                variant="hero"
                className="h-auto py-4 px-3 rounded-l-xl rounded-r-none shadow-glow flex flex-col gap-2 items-center"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs font-medium writing-mode-vertical" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                  {isMinimized ? "Continue Chat" : "Try AI Bot"}
                </span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window - sized for mobile safe areas, positioned on right for desktop */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-50 bg-card border border-border shadow-glow overflow-hidden flex flex-col overscroll-contain
              top-3 left-3 right-3 bottom-[env(safe-area-inset-bottom,16px)] pb-[env(safe-area-inset-bottom,0px)] rounded-xl max-h-[calc(100dvh-24px)]
              sm:inset-auto sm:right-6 sm:bottom-6 sm:top-auto sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-48px)] sm:rounded-2xl sm:pb-0"
            style={{ transformOrigin: "bottom right" }}
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
