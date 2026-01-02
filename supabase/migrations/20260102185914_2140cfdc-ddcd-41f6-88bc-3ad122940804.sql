-- Create table for form submissions (povprasevanja)
CREATE TABLE public.povprasevanja (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ime_priimek TEXT NOT NULL,
  podjetje TEXT,
  email TEXT NOT NULL,
  telefon TEXT,
  kaj_potrebuje TEXT NOT NULL,
  podstrani TEXT NOT NULL,
  vsebina TEXT NOT NULL,
  funkcionalnosti TEXT[],
  rok TEXT NOT NULL,
  dodatno TEXT,
  cena_min INTEGER NOT NULL,
  cena_max INTEGER NOT NULL
);

-- Enable RLS
ALTER TABLE public.povprasevanja ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can submit the form)
CREATE POLICY "Anyone can submit inquiry"
ON public.povprasevanja
FOR INSERT
WITH CHECK (true);

-- Only admins can view submissions (we'll handle this via edge function for now)
-- No select policy for public access - data is protected