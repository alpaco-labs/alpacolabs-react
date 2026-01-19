-- Add explicit deny policies for povprasevanja table
-- These document that only INSERT is allowed, all other operations are denied

-- Deny public SELECT access
CREATE POLICY "No public select on inquiries"
ON public.povprasevanja
FOR SELECT
USING (false);

-- Deny public UPDATE access
CREATE POLICY "No public update on inquiries"
ON public.povprasevanja
FOR UPDATE
USING (false);

-- Deny public DELETE access
CREATE POLICY "No public delete on inquiries"
ON public.povprasevanja
FOR DELETE
USING (false);