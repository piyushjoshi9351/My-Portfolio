# 🔧 Fix Supabase 401 Authorization Error

## Problem: 401 Unauthorized

Error: `Failed to load resource: the server responded with a status of 401`

**Cause:** Supabase Row Level Security (RLS) policies are blocking the anon key from accessing tables.

---

## ✅ Solution: Disable RLS on Your Tables

### Step 1: Go to Supabase Dashboard
1. Open: https://app.supabase.com
2. Select your project: "Portfolio"
3. Left sidebar → **Authentication** → **Policies**

### Step 2: Disable RLS for Each Table

For each table below, follow these steps:

#### **Table: `skills`**
1. Left sidebar → **Table Editor**
2. Click **`skills`** table
3. Top right: Click **⚙️ Settings**
4. Scroll down to **Authentication → Row Level Security (RLS)**
5. Toggle OFF: Disable RLS
6. Confirm when asked

#### **Table: `projects`**
- Repeat same steps for this table

#### **Table: `experience`**
- Repeat same steps for this table

#### **Table: `achievements`**
- Repeat same steps for this table

#### **Table: `admin_users`**
- Repeat same steps for this table

#### **Table: `about_section`**
- Repeat same steps for this table

### Step 3: Verify Disabled

After disabling, all tables should show: **"RLS is OFF"**

---

## ✅ After making changes:

1. **Go back to your portfolio:**
   - Browser refresh (F5)
   - Try adding a skill again
   - Should work now! ✅

---

## Why we disabled RLS?

| Feature | For Production | For Development |
|---------|---|---|
| RLS Enabled | ✅ Secure | ❌ Complex |
| RLS Disabled | ❌ Less Secure | ✅ Easy |

For your portfolio:
- **NOW (Development):** RLS disabled = easier to manage
- **BEFORE PRODUCTION:** Set up proper RLS policies

---

## Alternative: Enable RLS with Policies (Advanced)

If you want RLS enabled, create policies:

```sql
-- Allow all users to read
CREATE POLICY "Enable read access for all users" ON skills
  FOR SELECT USING (true);

-- Allow authenticated users to write
CREATE POLICY "Enable write access for authenticated users" ON skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

But for now, just disable RLS to get it working! 🚀

---

## Checklist

- [ ] Opened Supabase dashboard
- [ ] Disabled RLS on `skills` table
- [ ] Disabled RLS on `projects` table
- [ ] Disabled RLS on `experience` table
- [ ] Disabled RLS on `achievements` table
- [ ] Disabled RLS on `admin_users` table
- [ ] Disabled RLS on `about_section` table
- [ ] Refreshed browser (F5)
- [ ] Admin panel works now ✅

---

**After doing this, 401 error will go away!** 🎉
