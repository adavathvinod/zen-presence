-- Create enum for energy types
CREATE TYPE public.energy_type AS ENUM (
  'silent_observant',
  'comforting_presence',
  'public_event_plus_one',
  'calm_listener',
  'gentle_companion'
);

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM (
  'pending',
  'confirmed',
  'completed',
  'cancelled'
);

-- Create enum for presence nature
CREATE TYPE public.presence_nature AS ENUM (
  'park_sitting',
  'shopping_together',
  'restaurant_dining',
  'cafe_companion',
  'event_attendance',
  'office_support',
  'hospital_visit',
  'walking_companion'
);

-- Create profiles table for users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create companions table
CREATE TABLE public.companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  energy_type energy_type NOT NULL,
  avatar_url TEXT,
  hourly_rate INTEGER NOT NULL DEFAULT 500,
  languages TEXT[] DEFAULT ARRAY['Hindi', 'English'],
  city TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  is_available BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2,1) DEFAULT 4.5,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  companion_id UUID REFERENCES public.companions(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 2,
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  presence_nature presence_nature NOT NULL,
  special_notes TEXT,
  total_amount INTEGER NOT NULL,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Companions policies (public read)
CREATE POLICY "Anyone can view companions"
ON public.companions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Public can view companions"
ON public.companions FOR SELECT
TO anon
USING (true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
ON public.bookings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON public.bookings FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample companions
INSERT INTO public.companions (name, bio, energy_type, avatar_url, hourly_rate, city, languages)
VALUES 
  ('Arjun Mehta', 'A calm presence who finds peace in silence. Perfect for those moments when you need someone by your side without the pressure of conversation.', 'silent_observant', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 600, 'Mumbai', ARRAY['Hindi', 'English', 'Marathi']),
  ('Priya Sharma', 'Radiates warmth and comfort. Her gentle energy makes even the most anxious moments feel manageable.', 'comforting_presence', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 550, 'Delhi', ARRAY['Hindi', 'English', 'Punjabi']),
  ('Rohan Kapoor', 'The perfect plus-one for any occasion. Knows how to blend in while making you feel supported.', 'public_event_plus_one', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 700, 'Bangalore', ARRAY['Hindi', 'English', 'Kannada']),
  ('Ananya Reddy', 'A gentle soul who understands the art of being present. Ideal for quiet walks or peaceful café visits.', 'gentle_companion', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 500, 'Hyderabad', ARRAY['Hindi', 'English', 'Telugu']),
  ('Vikram Singh', 'Patient and understanding. His calm demeanor creates a safe space wherever you go.', 'calm_listener', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 650, 'Chennai', ARRAY['Hindi', 'English', 'Tamil']),
  ('Kavya Nair', 'Brings a sense of tranquility to every encounter. Perfect for those who value peace and quiet companionship.', 'silent_observant', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 575, 'Pune', ARRAY['Hindi', 'English', 'Malayalam']);