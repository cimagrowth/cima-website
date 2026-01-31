-- Drop the overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can create demo sessions" ON public.demo_chat_sessions;
DROP POLICY IF EXISTS "Anyone can create demo messages" ON public.demo_chat_messages;

-- Create restrictive INSERT policies - only allow server-side inserts (via service role)
-- These policies deny direct client inserts, forcing all writes through the edge function
CREATE POLICY "No direct public insert to sessions"
ON public.demo_chat_sessions
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No direct public insert to messages"
ON public.demo_chat_messages
FOR INSERT
WITH CHECK (false);