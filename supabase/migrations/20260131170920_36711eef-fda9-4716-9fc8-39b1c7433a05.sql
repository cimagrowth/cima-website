-- Create enum for clinic types
CREATE TYPE clinic_type AS ENUM ('fertility', 'med_spa', 'regenerative', 'other');

-- Create table for demo chat sessions
CREATE TABLE public.demo_chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_name TEXT NOT NULL,
  visitor_email TEXT NOT NULL,
  visitor_phone TEXT NOT NULL,
  clinic_type clinic_type NOT NULL DEFAULT 'fertility',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for demo chat messages
CREATE TABLE public.demo_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.demo_chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.demo_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public insert for demo sessions (visitors aren't authenticated)
CREATE POLICY "Anyone can create demo sessions"
ON public.demo_chat_sessions
FOR INSERT
WITH CHECK (true);

-- Allow public select for own session (by id)
CREATE POLICY "Anyone can view demo sessions"
ON public.demo_chat_sessions
FOR SELECT
USING (true);

-- Allow public insert for demo messages
CREATE POLICY "Anyone can create demo messages"
ON public.demo_chat_messages
FOR INSERT
WITH CHECK (true);

-- Allow public select for demo messages
CREATE POLICY "Anyone can view demo messages"
ON public.demo_chat_messages
FOR SELECT
USING (true);

-- Add indexes for performance
CREATE INDEX idx_demo_chat_messages_session_id ON public.demo_chat_messages(session_id);
CREATE INDEX idx_demo_chat_sessions_email ON public.demo_chat_sessions(visitor_email);

-- Add trigger for updated_at
CREATE TRIGGER update_demo_chat_sessions_updated_at
BEFORE UPDATE ON public.demo_chat_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();