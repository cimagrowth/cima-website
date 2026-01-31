-- Drop existing restrictive policies on demo_chat_messages
DROP POLICY IF EXISTS "No direct public access to messages" ON public.demo_chat_messages;
DROP POLICY IF EXISTS "No direct public insert to messages" ON public.demo_chat_messages;

-- Create admin-only access policies for demo_chat_messages
-- Admins can view all messages for support and monitoring purposes
CREATE POLICY "Only admins can view messages"
ON public.demo_chat_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Block all direct inserts - messages are only created via edge function with service role
CREATE POLICY "Block direct message inserts"
ON public.demo_chat_messages
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Block all direct updates
CREATE POLICY "Block direct message updates"
ON public.demo_chat_messages
FOR UPDATE
TO authenticated
USING (false);

-- Block all direct deletes
CREATE POLICY "Block direct message deletes"
ON public.demo_chat_messages
FOR DELETE
TO authenticated
USING (false);