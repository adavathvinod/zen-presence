-- Add phone column to bookings table
ALTER TABLE public.bookings ADD COLUMN phone text;

-- Update all companions to Hyderabad
UPDATE public.companions SET city = 'Hyderabad';