# 🚀 Supabase Migration Guide

## Overview
Migrating the Brand Assets Management System from Firebase to Supabase for better developer experience, simpler authentication, and more powerful database capabilities.

## 🏗️ Architecture Changes

### Database (Firebase Firestore → Supabase PostgreSQL)
- **Collections** → **Tables**
- **Documents** → **Rows**
- **Subcollections** → **Foreign keys/Relations**
- **NoSQL queries** → **SQL queries**

### Authentication (Firebase Auth → Supabase Auth)
- **Custom rules** → **Row Level Security (RLS)**
- **Token validation** → **Built-in user context**
- **Manual admin check** → **User roles/metadata**

### Storage (Firebase Storage → Supabase Storage)
- **Complex rules** → **Simple bucket policies**
- **Manual file handling** → **Built-in CDN**

## 📊 Database Schema Design

### 1. Users Table (Built-in)
```sql
-- Supabase provides this automatically
auth.users (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP,
  user_metadata JSONB
)
```

### 2. Assets Table
```sql
CREATE TABLE public.assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Asset Tags Table
```sql
CREATE TABLE public.asset_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#007bff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. User Profiles Table (for admin roles)
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔐 Row Level Security (RLS) Policies

### Assets Table Policies
```sql
-- Enable RLS
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Public can read all assets
CREATE POLICY "Public can view assets" ON public.assets
  FOR SELECT USING (true);

-- Only admins can insert/update/delete assets
CREATE POLICY "Admins can manage assets" ON public.assets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
```

### Asset Tags Policies
```sql
-- Enable RLS
ALTER TABLE public.asset_tags ENABLE ROW LEVEL SECURITY;

-- Public can read tags
CREATE POLICY "Public can view tags" ON public.asset_tags
  FOR SELECT USING (true);

-- Only admins can manage tags
CREATE POLICY "Admins can manage tags" ON public.asset_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
```

### Profiles Policies
```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (for admin checking)
CREATE POLICY "Anyone can view profiles" ON public.profiles
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 📁 Storage Bucket Setup

### Create Storage Bucket
```sql
-- Create assets bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true);
```

### Storage Policies
```sql
-- Public can view assets
CREATE POLICY "Public can view assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'assets');

-- Only admins can upload assets
CREATE POLICY "Admins can upload assets" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'assets' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Only admins can delete assets
CREATE POLICY "Admins can delete assets" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'assets' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
```

## 🔧 Setup Steps

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization (if needed)
4. Create new project:
   - **Name**: `paradigm-brand-assets`
   - **Database Password**: Generate strong password
   - **Region**: Choose closest to your location
5. Wait for project to initialize (~2 minutes)

### Step 2: Configure Database
1. Go to **SQL Editor** in Supabase dashboard
2. Run the database setup scripts (provided below)
3. Set up Row Level Security policies
4. Create storage bucket and policies

### Step 3: Configure Authentication
1. Go to **Authentication** → **Settings**
2. Configure **Site URL**: Add your domain(s)
3. Configure **Email Templates** (optional)
4. Enable **Email confirmation** (recommended)

### Step 4: Update Application Code
1. Install Supabase client
2. Replace Firebase config with Supabase config
3. Update authentication logic
4. Update database queries
5. Update file upload/storage logic

## 🔑 Environment Variables

Create `.env` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## 📦 Dependencies

Update your HTML to include Supabase:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

## 🚧 Migration Checklist

- [ ] Create Supabase project
- [ ] Set up database schema
- [ ] Configure RLS policies
- [ ] Set up storage bucket
- [ ] Migrate authentication logic
- [ ] Migrate asset management
- [ ] Migrate file upload
- [ ] Test admin functionality
- [ ] Test public access
- [ ] Deploy to production
- [ ] Update Firebase authorized domains → Supabase site URLs

## 📱 Key Code Changes Preview

### Old Firebase Init:
```javascript
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
```

### New Supabase Init:
```javascript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Old Firebase Auth:
```javascript
auth.signInWithEmailAndPassword(email, password);
```

### New Supabase Auth:
```javascript
await supabase.auth.signInWithPassword({ email, password });
```

### Old Firebase Query:
```javascript
db.collection('assets').get();
```

### New Supabase Query:
```javascript
await supabase.from('assets').select('*');
```

## 🎯 Next Steps

1. **Create Supabase project** (15 minutes)
2. **Set up database schema** (30 minutes)
3. **Migrate authentication** (45 minutes)
4. **Migrate asset management** (60 minutes)
5. **Test and deploy** (30 minutes)

**Total estimated time: ~3 hours**

Would you like to start with Step 1 (creating the Supabase project) or would you prefer me to begin working on the code migration while you set up the project?
