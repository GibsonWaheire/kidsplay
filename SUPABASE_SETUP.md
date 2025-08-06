# Supabase Setup Guide for KidsPlay

This guide will help you set up Supabase as your database backend for the KidsPlay application.

## 🚀 Quick Start

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `kidsplay-db` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon/Public Key** (starts with `eyJ`)

### 3. Set Up Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste it into the SQL editor and click "Run"

This will create:
- ✅ User profiles table
- ✅ Categories table
- ✅ Products table
- ✅ Special needs products table
- ✅ Tutors table
- ✅ Orders table
- ✅ Cart items table
- ✅ Notifications table
- ✅ Testimonials table
- ✅ Row Level Security (RLS) policies
- ✅ Sample data

### 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL:
   - **Site URL**: `https://kidsplay-omega.vercel.app`
   - **Redirect URLs**: 
     - `https://kidsplay-omega.vercel.app/auth/callback`
     - `http://localhost:5175/auth/callback` (for development)

3. Optional: Configure email templates in **Authentication** → **Email Templates**

### 6. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any connection errors
3. Try to sign up/sign in to test authentication

## 📊 Database Schema Overview

### Tables Created

| Table | Description | Key Features |
|-------|-------------|--------------|
| `user_profiles` | User account information | Extends Supabase auth.users |
| `categories` | Product categories | Includes accessibility features |
| `products` | Main product catalog | Featured products, ratings, reviews |
| `special_needs_products` | Accessibility-focused products | Accessibility features, categories |
| `tutors` | Tutor information | Subjects, ratings, availability |
| `orders` | Order management | Status tracking, payment info |
| `cart_items` | Shopping cart | User-specific cart items |
| `notifications` | User notifications | Read/unread status |
| `testimonials` | User reviews | Verified testimonials |

### Key Features

- 🔐 **Row Level Security (RLS)**: Data is protected at the database level
- 🎯 **Real-time subscriptions**: Live updates for notifications and cart
- 📊 **Automatic timestamps**: Created/updated timestamps on all tables
- 🔄 **Foreign key relationships**: Proper data relationships
- 📈 **Indexes**: Optimized for performance

## 🔧 Integration with Your App

### Authentication

The app now uses Supabase authentication instead of local storage:

```javascript
import { auth } from '../lib/supabase'

// Sign up
const { data, error } = await auth.signUp(email, password, {
  first_name: 'John',
  last_name: 'Doe'
})

// Sign in
const { data, error } = await auth.signIn(email, password)

// Sign out
const { error } = await auth.signOut()
```

### Database Operations

Use the database helper functions:

```javascript
import { database } from '../lib/supabase'

// Get products
const { data: products, error } = await database.getProducts()

// Get user profile
const { data: profile, error } = await database.getUserProfile(userId)

// Create order
const { data: order, error } = await database.createOrder(orderData)
```

## 🚨 Important Security Notes

1. **Never expose your service role key** in client-side code
2. **Use RLS policies** to protect your data
3. **Validate all inputs** before sending to Supabase
4. **Handle errors gracefully** in your application
5. **Use environment variables** for sensitive data

## 🔄 Migration from JSON Server

Your app currently uses `db.json` for local data. To migrate to Supabase:

1. **Export your current data** from `db.json`
2. **Transform the data** to match the new schema
3. **Import the data** using Supabase's data import feature
4. **Update your components** to use Supabase instead of local data
5. **Test thoroughly** before deploying

## 📈 Performance Optimization

1. **Use indexes** for frequently queried columns
2. **Implement pagination** for large datasets
3. **Use real-time subscriptions** sparingly
4. **Cache data** when appropriate
5. **Monitor query performance** in Supabase dashboard

## 🆘 Troubleshooting

### Common Issues

1. **Connection errors**: Check your environment variables
2. **RLS errors**: Verify your policies are correct
3. **Authentication issues**: Check your redirect URLs
4. **Performance issues**: Review your queries and indexes

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com)

## 🎯 Next Steps

1. **Deploy your changes** to Vercel
2. **Set up environment variables** in Vercel dashboard
3. **Test the live application**
4. **Monitor performance** and errors
5. **Add more features** as needed

## ✅ Implementation Status

- ✅ Supabase client configuration (`src/lib/supabase.js`)
- ✅ Authentication service (`src/lib/authService.js`)
- ✅ Updated AuthContext (`src/context/AuthContext.jsx`)
- ✅ Updated useAuth hook (`src/hooks/useAuth.js`)
- ✅ Database schema (`supabase-schema.sql`)
- ✅ Environment configuration (`env.example`)
- ✅ All component imports updated
- ✅ Linter errors resolved

## 🔧 Files Created/Updated

### New Files
- `src/lib/supabase.js` - Supabase client and database helpers
- `src/lib/authService.js` - Authentication service functions
- `src/hooks/useAuth.js` - useAuth hook
- `supabase-schema.sql` - Database schema
- `env.example` - Environment variables template
- `SUPABASE_SETUP.md` - This setup guide

### Updated Files
- `src/context/AuthContext.jsx` - Updated to use Supabase
- All component files updated to use new useAuth location

---

**Need help?** Check the [Supabase documentation](https://supabase.com/docs) or reach out to the community! 