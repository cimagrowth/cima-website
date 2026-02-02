-- Drop and recreate the view with security_invoker = true
-- This ensures the view respects RLS policies of underlying tables
DROP VIEW IF EXISTS public.demo_chat_sessions_masked;

CREATE VIEW public.demo_chat_sessions_masked 
WITH (security_invoker = true)
AS
SELECT 
    id,
    CASE
        WHEN length(visitor_name) > 2 THEN 
            SUBSTRING(visitor_name FROM 1 FOR 1) || '***' ||
            CASE
                WHEN POSITION(' ' IN visitor_name) > 0 THEN 
                    ' ' || SUBSTRING(visitor_name FROM POSITION(' ' IN visitor_name) + 1 FOR 1) || '***'
                ELSE ''
            END
        ELSE '***'
    END AS visitor_name,
    CASE
        WHEN POSITION('@' IN visitor_email) > 2 THEN 
            SUBSTRING(visitor_email FROM 1 FOR 2) || '***@' || SUBSTRING(visitor_email FROM POSITION('@' IN visitor_email) + 1)
        ELSE '***@***'
    END AS visitor_email,
    CASE
        WHEN length(visitor_phone) > 4 THEN 
            '***-***-' || RIGHT(visitor_phone, 4)
        ELSE '****'
    END AS visitor_phone,
    clinic_type,
    created_at,
    updated_at
FROM public.demo_chat_sessions;

-- Now we need to add a SELECT policy on demo_chat_sessions for admins
-- so they can access data through the security_invoker view
CREATE POLICY "Admins can view sessions via masked view"
ON public.demo_chat_sessions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));