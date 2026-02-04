# Simba Driver Mobile App 🚗

A professional React Native driver application built with Expo, featuring Supabase authentication, premium UI design, and gig acceptance system. Inspired by Uber and Lyft's design standards.

## 🎯 Features

### Authentication & Security

- ✅ **Supabase Authentication** - Secure email/password registration and login
- ✅ **Auth Protection** - Restricted access to app without login
- ✅ **Session Management** - Automatic login state handling
- ✅ **Logout Functionality** - Sign out via sidebar menu

### Driver Features

- ✅ **Online/Offline Toggle** - Control gig availability with one tap
- ✅ **Gig Acceptance System** - Accept rides with "Kubali" button
- ✅ **Real-time Database Sync** - All data synced to Supabase
- ✅ **Driver Profile** - Name, email, rating, and online status

### UI/UX Design

- ✅ **Premium Styling** - White background, greyish inputs, professional typography
- ✅ **Font Awesome Icons** - Professional icons throughout the app
- ✅ **Responsive Layout** - Works on Android, iOS, and Web
- ✅ **Tab Navigation** - Home, Earnings, and History tabs
- ✅ **Sidebar Menu** - Profile, Settings, Help, and Vehicles pages

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed
- npm or yarn
- Supabase account (free at https://supabase.com)
- Expo Go app on your phone (optional, for testing)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Supabase

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Sign up or login
   - Create new project named `simba-driver-mobile`
   - Wait 2-5 minutes for initialization

2. **Create Database Tables**

   Go to **SQL Editor** and run:

   ```sql
   -- Drivers Table
   CREATE TABLE drivers (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     rating FLOAT DEFAULT 4.8,
     is_online BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX drivers_email_idx ON drivers(email);

   -- Gigs Table
   CREATE TABLE gigs (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
     from_location TEXT NOT NULL,
     to_location TEXT NOT NULL,
     distance TEXT NOT NULL,
     eta TEXT NOT NULL,
     amount TEXT NOT NULL,
     passenger_name TEXT NOT NULL,
     status TEXT DEFAULT 'accepted',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX gigs_driver_id_idx ON gigs(driver_id);
   ```

3. **Enable Email Authentication**
   - Go to **Authentication** → **Providers**
   - Toggle **Email** to ON
   - Save

4. **Get Your Credentials**
   - Go to **Settings** → **API**
   - Copy:
     - **Project URL** (SUPABASE_URL)
     - **Anon Public** (SUPABASE_ANON_KEY)

### Step 3: Configure App Credentials

Edit `lib/supabase.ts`:

```typescript
const SUPABASE_URL = "https://your-project-id.supabase.co"; // Replace with your URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs..."; // Replace with your key
```

### Step 4: Start the App

```bash
npm start
```

You'll see a QR code. Options:

- Scan with **Expo Go** app on your phone
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Press `w` for web

## 📱 Testing the App

### Register a New Driver

1. Open app and click "Create New Account"
2. Fill in:
   - Full Name: `John Driver`
   - Email: `john@example.com`
   - Password: `Password123`
   - Confirm: `Password123`
3. Click "Create Account"
4. Success message appears

### Login

1. Click "Back to login"
2. Enter email and password
3. Click "Sign In"
4. See home screen with gigs

### Accept Gigs

1. **Go Online** - Click green "Online" button
2. **See Gigs** - Gig list appears below
3. **Accept Gig** - Click "Kubali" on any gig
4. **Confirmation** - Button changes to gray "✓ Imekubali"

### Toggle Online/Offline

- **Online** (Green) - Receive and accept gigs
- **Offline** (Red) - No gigs visible, "Go online to receive gigs" message
- Click button to toggle instantly

### Access Sidebar

1. Click **👤 Profile** icon (top-left)
2. Navigate to:
   - **Profile** - Driver information
   - **Settings** - App settings
   - **Help** - Support information
   - **Vehicles** - Manage vehicles
   - **Logout** - Sign out

## 🏗 Project Structure

```
Simba-Driver-Mobile-App/
├── app/
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx           # Home screen (main gigs list)
│   │   ├── earnings.tsx        # Earnings page
│   │   └── history.tsx         # Trip history
│   ├── sidebar/                 # Sidebar menu pages
│   │   ├── profile.tsx         # Driver profile
│   │   ├── settings.tsx        # Settings
│   │   ├── help.tsx            # Help & support
│   │   └── vehicles.tsx        # Vehicle management
│   ├── login.tsx               # Login screen
│   ├── register.tsx            # Registration screen
│   ├── _layout.tsx             # Root layout with auth protection
│   └── modal.tsx               # Modal component
├── context/
│   └── auth.tsx                # Authentication context (signUp, signIn, signOut)
├── lib/
│   └── supabase.ts             # Supabase client configuration
├── components/                  # Reusable UI components
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   ├── parallax-scroll-view.tsx
│   └── ui/
├── constants/
│   └── theme.ts                # Color theme configuration
├── hooks/
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
├── assets/
│   └── images/                 # App images and logo
└── package.json                # Dependencies
```

## 🔧 Key Files

### Authentication (`context/auth.tsx`)

- `signUp(email, password, name)` - Register driver
- `signIn(email, password)` - Login driver
- `signOut()` - Logout driver
- Auth state monitoring

### Supabase Config (`lib/supabase.ts`)

- Initializes Supabase client
- Stores credentials securely

### Home Screen (`app/(tabs)/index.tsx`)

- Displays online/offline toggle
- Shows gig list when online
- Handles gig acceptance
- Updates Supabase in real-time

### Login (`app/login.tsx`)

- Email/password authentication
- Professional white background
- Greyish input fields with Font Awesome icons
- Redirect to register option

### Register (`app/register.tsx`)

- Full name, email, password, confirm password
- Password validation (min 6 chars, must match)
- Auto-creates driver profile
- Professional premium design

## 🗄 Database Schema

### Drivers Table

```
id (UUID) - Primary key
email (TEXT) - Unique email
name (TEXT) - Driver name
rating (FLOAT) - Star rating (default: 4.8)
is_online (BOOLEAN) - Online status
created_at (TIMESTAMP) - Creation date
updated_at (TIMESTAMP) - Last update
```

### Gigs Table

```
id (UUID) - Primary key
driver_id (UUID) - Reference to drivers
from_location (TEXT) - Pickup location
to_location (TEXT) - Dropoff location
distance (TEXT) - Trip distance
eta (TEXT) - Estimated arrival
amount (TEXT) - Payment amount
passenger_name (TEXT) - Passenger name
status (TEXT) - accepted/completed/cancelled
created_at (TIMESTAMP) - Creation date
updated_at (TIMESTAMP) - Last update
```

## 🎨 Design System

### Colors

- **Background**: White (#ffffff)
- **Input Fields**: Light Grey (#f5f5f5) with border (#e8e8e8)
- **Buttons**: Dark Grey (#616161) with white text
- **Text**: Dark (#1a1a1a)
- **Placeholders**: Grey (#999999)
- **Icons**: Grey (#999999) with 60% opacity

### Typography

- **Title**: 32px, Bold (700)
- **Subtitle**: 15px, Regular (500)
- **Labels**: 14px, Semi-bold (600)
- **Body**: 16px, Medium (500)

### Icons

- Using **Font Awesome** from `@expo/vector-icons/FontAwesome`
- Email: `envelope`
- Password: `lock`
- User: `user`
- All 18px size, grey color with opacity

## 📦 Dependencies

```json
{
  "react-native": "^0.81.5",
  "expo": "^54.0.32",
  "expo-router": "^6.0.22",
  "@supabase/supabase-js": "^2.38.4",
  "@expo/vector-icons": "^14.0.2"
}
```

## 🚧 Development

### Start Development Server

```bash
npm start
```

### Clear Cache and Restart

```bash
npm start -- --clear
```

### Stop Dev Server

```bash
Ctrl + C
```

## 🔍 Troubleshooting

### App not loading

- Check internet connection
- Verify Supabase credentials in `lib/supabase.ts`
- Clear cache: `npm start -- --clear`

### Login/Register not working

- Verify Email auth is enabled in Supabase
- Check that tables exist in Supabase
- Confirm credentials are correct

### Can't accept gigs

- Make sure you're logged in
- Check that "Online" status is active (green button)
- Verify Supabase gigs table exists

### Data not syncing

- Check Supabase connection
- Verify internet connection
- Check browser console for errors

## 📝 License

This project is private and maintained by the Simba Driver team.

## 📞 Support

For issues or questions:

1. Check the **Help** section in the app sidebar
2. Contact the development team
3. Review Supabase documentation at https://supabase.com/docs

## 🎉 Next Steps

- Test authentication and gig acceptance
- Customize branding and colors in `constants/theme.ts`
- Add more features (payments, ratings, notifications)
- Deploy to Expo EAS Build for production
- Submit to Google Play Store and Apple App Store

---

**Happy coding! 🚀**
