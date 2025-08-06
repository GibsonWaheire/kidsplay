# Database Setup Guide

This guide explains the database files and setup process for KidsPlay Connect.

## 📁 Database Files

### Essential Files (Keep These)

1. **`complete-migration-final.sql`** ⭐
   - **Purpose**: Complete database schema and setup
   - **Usage**: Run this in Supabase SQL editor for full setup
   - **Contains**: Tables, RLS policies, indexes, triggers, sample data

2. **`sample-data-insert.sql`**
   - **Purpose**: Insert sample data into existing database
   - **Usage**: Run after `complete-migration-final.sql` if you want additional sample data
   - **Contains**: Products, categories, stats, tutors, testimonials

3. **`sample-data-cleanup.sql`**
   - **Purpose**: Remove sample data from database
   - **Usage**: Run to clean up sample data when switching to live data
   - **Contains**: DELETE statements for sample records

### Documentation Files

4. **`FINAL_SETUP_GUIDE.md`**
   - **Purpose**: Step-by-step setup instructions
   - **Usage**: Follow for complete Supabase setup

5. **`SUPABASE_SETUP.md`**
   - **Purpose**: Supabase-specific configuration
   - **Usage**: Reference for Supabase dashboard setup

## 🚀 Quick Setup

### Option 1: Full Setup (Recommended)
```sql
-- Run this in Supabase SQL Editor
-- File: complete-migration-final.sql
-- This includes everything: schema + sample data
```

### Option 2: Schema Only + Custom Data
```sql
-- 1. Run complete-migration-final.sql (skip sample data section)
-- 2. Add your own data via admin dashboard or API
```

### Option 3: Reset Database
```sql
-- 1. Run sample-data-cleanup.sql (removes sample data)
-- 2. Add fresh data as needed
```

## ⚠️ Important Notes

- **App works without database**: Uses sample data fallbacks
- **No breaking changes**: Safe to run migration multiple times
- **RLS enabled**: All tables have proper security policies
- **Admin user**: Create manually in Supabase Auth, then update profile role

## 🔧 Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Note**: App works without these - uses sample data automatically!