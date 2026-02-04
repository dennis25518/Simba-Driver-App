# Supabase Setup Guide for Simba Driver App

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" or sign in to your account
3. Create a new project:
   - Project name: `simba-driver-mobile`
   - Database password: Create a secure password
   - Region: Select closest to you (e.g., `us-east-1`)
   - Click "Create new project"

4. Wait for project to initialize (2-5 minutes)

## 2. Get Your Credentials

1. Once project is ready, go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** → Use as `SUPABASE_URL`
   - **Anon Public** → Use as `SUPABASE_ANON_KEY`

## 3. Create Database Tables

### Table 1: Drivers Table

Go to **SQL Editor** and run this query:

```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  rating FLOAT DEFAULT 4.8,
  is_online BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX drivers_email_idx ON drivers(email);
```

### Table 2: Gigs Table

```sql
CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  distance TEXT NOT NULL,
  eta TEXT NOT NULL,
  amount TEXT NOT NULL,
  passenger_name TEXT NOT NULL,
  status TEXT DEFAULT 'accepted', -- accepted, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for driver lookups
CREATE INDEX gigs_driver_id_idx ON gigs(driver_id);
```

## 4. Enable Auth

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider:
   - Toggle "Email" to ON
   - Keep defaults and save

## 5. Configure App with Credentials

Edit `lib/supabase.ts` and replace placeholders:

```typescript
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs...";
```

## 6. Test Authentication

### Register a New Driver

1. Scan QR code in terminal with Expo Go
2. Click "Go to register"
3. Fill in:
   - Full Name: `John Driver`
   - Email: `john@example.com`
   - Password: `Password123`
   - Confirm: `Password123`
4. Click "Jisajili"
5. Should show "Registration successful! Please login"

### Login

1. Click "Back to login"
2. Enter email and password
3. Click "Ingia"
4. Should see home screen with map and gigs list

## 7. Test Features

### Online/Offline Toggle

1. Press the green "Online" button at top-right
2. Should show alert "You're now online - receiving gigs"
3. Should toggle to green and show gigs list
4. Press again to go offline
5. Should show "You're now offline - no gigs"
6. Gigs list should disappear, showing "🔴 Go online to receive gigs"

### Accept a Gig

1. Make sure you're online
2. Click the green "Kubali" button on any gig
3. Should show alert "Gig Accepted! You accepted a gig successfully!"
4. Button should change to gray "✓ Imekubali"
5. Check Supabase: **SQL Editor** → Run:
   ```sql
   SELECT * FROM gigs;
   ```
   Should see your accepted gig

### Logout

1. Click profile icon (👤) at top-left
2. Click "Toka nje" (Logout)
3. Should return to login page

## 8. Database Verification

To verify data is saving correctly:

**Check Drivers:**

```sql
SELECT * FROM drivers;
```

**Check Gigs:**

```sql
SELECT * FROM gigs;
```

**Check User Sessions:**

```sql
SELECT * FROM auth.users;
```

## 9. Troubleshooting

### Error: "Failed to sign up"

- Check if email already exists in database
- Verify password is at least 6 characters
- Check browser console for error details

### Error: "Failed to accept gig"

- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check if user is logged in (check Auth context)
- Check Supabase project is not paused

### Gigs not appearing when online

- Make sure handleToggleOnline is being called
- Check if isOnline state is actually true
- Verify gigs.slice(0,3).map is not failing

### Can't see login page

- Make sure app.\_layout.tsx is using AuthProvider
- Check if user auth state is loading (might be null during check)
- Restart dev server with `r` key

## 10. Security Notes

⚠️ **For Production:**

- Never commit SUPABASE_ANON_KEY to Git
- Use environment variables (.env.local)
- Enable Row Level Security (RLS) for tables
- Create policies to prevent unauthorized access
- Set up proper error handling for user-facing errors

For now, this setup is for development/testing only.
