-- Fix: Remove admin direct access to raw PII in demo_chat_sessions
-- Admins should only access data through a secure masked function

-- Drop the policy that gives admins direct access to raw data
DROP POLICY IF EXISTS "Admins can view sessions via masked view" ON public.demo_chat_sessions;

-- Drop the existing masked view (we'll replace with a secure function)
DROP VIEW IF EXISTS public.demo_chat_sessions_masked;

-- Create a SECURITY DEFINER function that returns masked session data
-- This function checks admin role and only returns masked PII
CREATE OR REPLACE FUNCTION public.get_demo_sessions_masked()
RETURNS TABLE (
  id uuid,
  visitor_name_masked text,
  visitor_email_masked text,
  visitor_phone_masked text,
  business_name text,
  clinic_type clinic_type,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    -- Mask name: show first letter + asterisks
    CASE 
      WHEN visitor_name IS NOT NULL AND length(visitor_name) > 0 THEN
        left(visitor_name, 1) || repeat('*', greatest(length(visitor_name) - 1, 3))
      ELSE NULL
    END as visitor_name_masked,
    -- Mask email: show first 2 chars + *** + domain
    CASE 
      WHEN visitor_email IS NOT NULL AND position('@' in visitor_email) > 0 THEN
        left(visitor_email, 2) || '***@' || 
        substring(visitor_email from position('@' in visitor_email) + 1)
      ELSE NULL
    END as visitor_email_masked,
    -- Mask phone: show last 4 digits only
    CASE 
      WHEN visitor_phone IS NOT NULL AND length(visitor_phone) >= 4 THEN
        '***-***-' || right(regexp_replace(visitor_phone, '[^0-9]', '', 'g'), 4)
      ELSE NULL
    END as visitor_phone_masked,
    business_name,
    clinic_type,
    created_at,
    updated_at
  FROM demo_chat_sessions
  WHERE public.has_role(auth.uid(), 'admin')
$$;

-- Grant execute permission to authenticated users (function checks admin internally)
GRANT EXECUTE ON FUNCTION public.get_demo_sessions_masked() TO authenticated;