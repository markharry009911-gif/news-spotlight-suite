-- Create news table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  source TEXT NOT NULL DEFAULT 'Admin',
  is_highlight BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for reading news)
CREATE POLICY "News are publicly readable" 
ON public.news 
FOR SELECT 
USING (true);

-- Create policies for admin write access (will need auth later)
CREATE POLICY "Authenticated users can insert news" 
ON public.news 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update news" 
ON public.news 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete news" 
ON public.news 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.news (title, content, excerpt, image_url, source, is_highlight) VALUES
('Breaking: Major Sports Championship Finals Begin', 'The championship finals have officially started with record-breaking attendance. Teams from across the region are competing for the ultimate prize in what promises to be an exciting tournament. Fans have traveled from far and wide to witness this historic event.', 'Championship finals begin with record attendance and exciting matchups ahead.', '/assets/tennis-match.jpg', 'Sports Central', true),
('Tennis Tournament Sees Upset Victory', 'In a stunning turn of events, the underdog player defeated the world number one in straight sets. The match lasted just over two hours and showcased incredible skill and determination from both athletes. This victory marks a significant milestone in the young player''s career.', 'Underdog defeats world number one in stunning upset victory.', '/assets/tennis-match.jpg', 'Tennis Today', false),
('Cycling Race Draws International Attention', 'The annual cycling race has attracted participants from over 30 countries. The challenging route spans multiple terrains and promises to test even the most experienced cyclists. Weather conditions are expected to play a crucial role in determining the winner.', 'International cycling race features challenging route and global participation.', '/assets/cycling-race.jpg', 'Cycling News', false),
('Track and Field Records Broken', 'Multiple world records were shattered at yesterday''s track and field meet. Athletes pushed the boundaries of human performance in front of an enthusiastic crowd. The event has been hailed as one of the most successful in recent history.', 'World records broken at historic track and field meet.', '/assets/track-running.jpg', 'Track Weekly', true),
('Swimming Championships Make Waves', 'The national swimming championships concluded with several surprising results. New talent emerged while established champions defended their titles in thrilling races. Pool records were broken in multiple categories throughout the week-long event.', 'National swimming championships feature surprising results and new talent.', '/assets/hero-swimming.jpg', 'Swim Report', false),
('Marathon Training Tips from Pros', 'Professional marathon runners share their secrets for success. From nutrition strategies to training schedules, these insights could help amateur runners improve their performance. The advice comes from athletes with decades of combined experience.', 'Professional runners share training secrets and performance tips.', '/assets/track-running.jpg', 'Runner''s Guide', false);