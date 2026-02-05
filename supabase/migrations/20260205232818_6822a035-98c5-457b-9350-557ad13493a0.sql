-- Add business_name column to demo_chat_sessions
ALTER TABLE public.demo_chat_sessions
ADD COLUMN business_name text;