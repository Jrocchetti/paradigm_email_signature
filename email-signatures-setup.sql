-- Email Signatures Table Setup for Supabase
-- Run this in your Supabase SQL Editor

-- Create the email_signatures table
CREATE TABLE IF NOT EXISTS public.email_signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    title TEXT,
    phone TEXT,
    email TEXT,
    headshot TEXT, -- Base64 encoded image data
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.email_signatures ENABLE ROW LEVEL SECURITY;

-- Create policies for the email_signatures table
-- Allow authenticated users to read their own signatures
CREATE POLICY "Users can view their own email signatures" ON public.email_signatures
    FOR SELECT USING (auth.uid() = created_by);

-- Allow authenticated users to create signatures
CREATE POLICY "Users can create email signatures" ON public.email_signatures
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own signatures
CREATE POLICY "Users can update their own email signatures" ON public.email_signatures
    FOR UPDATE USING (auth.uid() = created_by);

-- Allow users to delete their own signatures
CREATE POLICY "Users can delete their own email signatures" ON public.email_signatures
    FOR DELETE USING (auth.uid() = created_by);

-- Admin override policy - allow admin users to manage all signatures
CREATE POLICY "Admins can manage all email signatures" ON public.email_signatures
    FOR ALL USING (
        auth.jwt() ->> 'email' LIKE '%@paradigmproductionsgroup.com'
    );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_email_signatures_updated_at
    BEFORE UPDATE ON public.email_signatures
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Verification query
SELECT 
    'Email signatures table exists: ' || EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'email_signatures'
    )::text as table_check;
