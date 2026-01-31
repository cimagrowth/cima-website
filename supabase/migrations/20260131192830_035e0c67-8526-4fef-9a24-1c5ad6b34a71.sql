-- Drop the overly permissive SELECT policies
DROP POLICY IF EXISTS "Anyone can view demo sessions" ON public.demo_chat_sessions;
DROP POLICY IF EXISTS "Anyone can view demo messages" ON public.demo_chat_messages;

-- Create a more restrictive SELECT policy for demo_chat_sessions
-- Since these are anonymous users without auth, we'll rely on the application
-- only querying for sessions the user created (by session ID)
-- The SELECT policy will deny direct public access - data must be accessed via the edge function
CREATE POLICY "No direct public access to sessions"
ON public.demo_chat_sessions
FOR SELECT
USING (false);

-- Create a more restrictive SELECT policy for demo_chat_messages  
-- Messages should only be accessible via the edge function which validates session ownership
CREATE POLICY "No direct public access to messages"
ON public.demo_chat_messages
FOR SELECT
USING (false);