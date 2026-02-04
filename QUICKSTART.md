# Quick Start - Authentication & Gig Acceptance

## ✅ What's Ready

Your Simba Driver app now has:

- ✅ **Login/Register System** - New drivers can create accounts
- ✅ **Auth Protection** - Can't access app without logging in
- ✅ **Online/Offline Toggle** - Control gig availability
- ✅ **Gig Acceptance** - Click "Kubali" to accept rides
- ✅ **Database Integration** - All data syncs to Supabase
- ✅ **Logout** - Sign out via sidebar menu

## 🚀 To Get It Running

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Sign up with email
3. Create new project named "simba-driver-mobile"
4. Wait 2-5 minutes for initialization

### Step 2: Set Up Database

1. Go to **SQL Editor** in your Supabase project
2. Paste and run the SQL from [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
3. Creates two tables: `drivers` and `gigs`

### Step 3: Get Your Credentials

1. Click **Settings** → **API**
2. Copy:
   - **Project URL** (under "Project URL")
   - **Anon Public** (under "Your anon public key")

### Step 4: Update Your App

Edit `lib/supabase.ts`:

```typescript
const SUPABASE_URL = "https://your-project-id.supabase.co"; // Paste here
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs..."; // Paste here
```

### Step 5: Restart App

Press `r` in the terminal running `npm start`

## 📱 Testing the App

### Register

1. Scan QR code with Expo Go
2. Click "Jisajili" (Register)
3. Enter:
   - Name: `John Driver`
   - Email: `john@example.com`
   - Password: `Password123`
   - Confirm: `Password123`
4. Click "Jisajili" → Success!

### Login

1. Click "Back to Login"
2. Enter email & password
3. Click "Ingia" (Login)
4. See home screen ✅

### Accept Gigs

1. Default: **Offline** - no gigs visible
2. Click **green "Online"** button
3. See gigs list appear
4. Click **"Kubali"** on any gig
5. Button changes to **gray "✓ Imekubali"** (accepted)

### Go Offline

1. Click **"Online"** button again
2. Goes **red "Offline"**
3. Message: **"🔴 Go online to receive gigs"**
4. Gigs disappear

### Logout

1. Click **👤** profile icon (top-left)
2. Click **"Toka nje"** (Logout)
3. Back to login page

## 🔍 Verify Data in Supabase

Check that data is saving:

**View Drivers:**

```sql
SELECT * FROM drivers;
```

**View Gigs:**

```sql
SELECT * FROM gigs;
```

**View User Accounts:**

```sql
SELECT id, email FROM auth.users;
```

## ❌ Troubleshooting

**Can't see login page?**

- Make sure dev server is running: `npm start`
- Press `r` to reload
- Check terminal for errors

**Can't login?**

- Make sure you registered first
- Check email/password are correct
- Verify Supabase URL/Key are correct in `lib/supabase.ts`

**Gigs don't appear?**

- Make sure you clicked the "Online" button
- Check if isOnline is actually true (should be green button)
- Verify you're logged in

**Data not saving?**

- Check Supabase credentials are correct
- Verify tables exist (SQL Editor)
- Check project is not paused
- Open browser console (F12) for error messages

## 📚 Documentation

- Full setup guide: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- Implementation details: [AUTH_IMPLEMENTATION_SUMMARY.md](AUTH_IMPLEMENTATION_SUMMARY.md)

## 🎯 Features Implemented

| Feature           | Status | Details                        |
| ----------------- | ------ | ------------------------------ |
| User Registration | ✅     | Email/password with validation |
| User Login        | ✅     | Session management             |
| Auth Protection   | ✅     | Can't access app without login |
| Online/Offline    | ✅     | Syncs to Supabase              |
| Gig Display       | ✅     | Only when online               |
| Gig Acceptance    | ✅     | Saves to database              |
| Logout            | ✅     | Via sidebar menu               |
| User Profile      | ✅     | In sidebar                     |

---

**Your app is ready! Follow the 5 steps above to get started.** 🚀
