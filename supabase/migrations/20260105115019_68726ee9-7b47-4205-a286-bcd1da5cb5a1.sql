-- Create rate limits table for inquiry submissions
CREATE TABLE public.inquiry_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiry_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for edge function to insert (using service role)
-- No public policies needed since this is only accessed via service role

-- Create index for efficient lookup
CREATE INDEX idx_inquiry_rate_limits_identifier_time 
  ON public.inquiry_rate_limits(identifier, created_at DESC);

-- Create function to clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.inquiry_rate_limits 
    WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$;