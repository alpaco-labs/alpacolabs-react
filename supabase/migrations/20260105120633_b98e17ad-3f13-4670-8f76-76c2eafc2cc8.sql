-- Add restrictive RLS policies to inquiry_rate_limits table
-- Only service role (which bypasses RLS) should access this table

CREATE POLICY "No public select on rate limits"
ON public.inquiry_rate_limits
FOR SELECT
USING (false);

CREATE POLICY "No public insert on rate limits"
ON public.inquiry_rate_limits
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No public update on rate limits"
ON public.inquiry_rate_limits
FOR UPDATE
USING (false);

CREATE POLICY "No public delete on rate limits"
ON public.inquiry_rate_limits
FOR DELETE
USING (false);

-- Convert cleanup function to SECURITY INVOKER and restrict execution
DROP FUNCTION IF EXISTS public.cleanup_old_rate_limits();

CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.inquiry_rate_limits 
    WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Restrict execution to service_role only
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_old_rate_limits() TO service_role;