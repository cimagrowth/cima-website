-- Drop existing restrictive policies on demo_chat_sessions
DROP POLICY IF EXISTS "No direct public access to sessions" ON public.demo_chat_sessions;
DROP POLICY IF EXISTS "No direct public insert to sessions" ON public.demo_chat_sessions;

-- Create admin-only access policies for demo_chat_sessions
-- Admins can view all sessions for support and monitoring purposes
CREATE POLICY "Only admins can view sessions"
ON public.demo_chat_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Block all direct inserts - sessions are only created via edge function with service role
CREATE POLICY "Block direct session inserts"
ON public.demo_chat_sessions
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Block all direct updates
CREATE POLICY "Block direct session updates"
ON public.demo_chat_sessions
FOR UPDATE
TO authenticated
USING (false);

-- Block all direct deletes
CREATE POLICY "Block direct session deletes"
ON public.demo_chat_sessions
FOR DELETE
TO authenticated
USING (false);