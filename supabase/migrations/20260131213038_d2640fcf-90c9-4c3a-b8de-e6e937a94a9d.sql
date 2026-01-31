-- Create a secure view that masks PII for admin viewing
-- This prevents full data exposure if an admin account is compromised

CREATE OR REPLACE VIEW public.demo_chat_sessions_masked
WITH (security_invoker = on) AS
SELECT 
  id,
  -- Mask visitor name: show first name initial + last name initial
  CASE 
    WHEN LENGTH(visitor_name) > 2 THEN 
      SUBSTRING(visitor_name FROM 1 FOR 1) || '***' || 
      CASE 
        WHEN POSITION(' ' IN visitor_name) > 0 
        THEN ' ' || SUBSTRING(visitor_name FROM POSITION(' ' IN visitor_name) + 1 FOR 1) || '***'
        ELSE ''
      END
    ELSE '***'
  END AS visitor_name,
  -- Mask email: show first 2 chars + *** + domain
  CASE 
    WHEN POSITION('@' IN visitor_email) > 2 THEN 
      SUBSTRING(visitor_email FROM 1 FOR 2) || '***@' || 
      SUBSTRING(visitor_email FROM POSITION('@' IN visitor_email) + 1)
    ELSE '***@***'
  END AS visitor_email,
  -- Mask phone: show only last 4 digits
  CASE 
    WHEN LENGTH(visitor_phone) > 4 THEN 
      '***-***-' || RIGHT(visitor_phone, 4)
    ELSE '****'
  END AS visitor_phone,
  clinic_type,
  created_at,
  updated_at
FROM public.demo_chat_sessions;

-- Grant SELECT on the masked view to authenticated users
GRANT SELECT ON public.demo_chat_sessions_masked TO authenticated;

-- Update the SELECT policy on base table to be more restrictive
-- Drop existing admin SELECT policy
DROP POLICY IF EXISTS "Only admins can view sessions" ON public.demo_chat_sessions;

-- Create new policy that denies ALL direct SELECT access
-- Admins must use the masked view instead
CREATE POLICY "No direct SELECT access"
ON public.demo_chat_sessions
FOR SELECT
USING (false);

-- Add comment explaining the security model
COMMENT ON VIEW public.demo_chat_sessions_masked IS 
'Secure view for admin access to demo chat sessions with PII masked. Direct table access is blocked to prevent full data exposure if admin credentials are compromised.';