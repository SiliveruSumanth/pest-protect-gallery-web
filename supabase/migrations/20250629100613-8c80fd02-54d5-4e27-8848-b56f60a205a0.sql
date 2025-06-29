
-- Create appointments table to store booking data
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  pest_type TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert appointments (public booking form)
CREATE POLICY "Anyone can create appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading appointments (for admin purposes)
CREATE POLICY "Anyone can view appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (true);

-- Create policy to allow updating appointments (for admin status updates)
CREATE POLICY "Anyone can update appointments" 
  ON public.appointments 
  FOR UPDATE 
  USING (true);
