-- Revert RLS policies to allow public access for appointments

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admin can view all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admin can update appointments" ON public.appointments;

-- Create public access policies (similar to original but more secure)
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

-- Allow viewing for administrative purposes
CREATE POLICY "Anyone can view appointments" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Allow updating for administrative purposes  
CREATE POLICY "Anyone can update appointments" 
ON public.appointments 
FOR UPDATE 
USING (true);

-- Still no DELETE policy to prevent data loss