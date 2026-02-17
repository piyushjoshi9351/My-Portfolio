# 🔐 Admin Credentials Management

## Current Setup

Your admin credentials are configured in `.env.local`:

```env
ADMIN_USERNAME=piyush
ADMIN_PASSWORD=MyPassword123
```

---

## ❌ BEFORE YOU DEPLOY

**IMPORTANT:** Change your admin password BEFORE deploying to production!

### ⚠️ Security Warning

Never use the default demo password in production:
- Anyone who sees this file can access your admin panel
- Always use a STRONG password
- Don't share `.env.local` file with anyone

---

## 🔑 How to Change Your Password

### Local Development (Right Now)

1. **Edit `.env.local`:**
   ```
   ADMIN_USERNAME=piyush
   ADMIN_PASSWORD=YourVeryStrongPassword123!
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Test new credentials:**
   - Go to `http://localhost:9002/admin/login`
   - Login with new password

### Production (Vercel)

1. **Never commit `.env.local` to GitHub** ✋

2. **Instead, add to Vercel Dashboard:**
   - Go to Vercel project settings
   - Environment Variables section
   - Add: `ADMIN_USERNAME` and `ADMIN_PASSWORD`
   - Re-deploy

3. **Example strong password:**
   ```
   MyPortfolio@Piyush#2024$Secure
   ```

---

## 🎯 Best Practices

### ✅ DO:
- Use a password with mix of uppercase, lowercase, numbers, symbols
- Change password periodically  
- Keep `.env.local` out of version control (it's in .gitignore)
- Use different password for different environments (local vs production)
- Store production credentials only in Vercel Dashboard

### ❌ DON'T:
- Use simple passwords (password123, admin, piyush, etc.)
- Share `.env.local` file with others
- Commit `.env.local` to GitHub
- Use same password everywhere
- Post credentials in public issues/PRs

---

## 📋 Password Guidelines

### Minimum Requirements:
- ✅ At least 12 characters
- ✅ Mix of uppercase & lowercase
- ✅ At least one number
- ✅ At least one special character (!@#$%^&*)

### Examples of STRONG passwords:
```
SecurePass#2024$Admin
MyPortf0lio@Secure!Piyush
Admin123$Portal#Secure
```

### Examples of WEAK passwords:
```
password123      ❌ Too simple
admin            ❌ Too simple
piyush           ❌ Too simple
123456           ❌ Only numbers
```

---

## 🔄 Changing Credentials Later

Anytime you want to change credentials:

1. **For Local Dev:**
   ```
   Edit .env.local → Change ADMIN_PASSWORD → npm run dev → Test
   ```

2. **For Production (Vercel):**
   ```
   Vercel Dashboard → Settings → Environment Variables → Update → Re-deploy
   ```

---

## 🚨 If You Forget Your Password

### Local Development:
- Just edit `.env.local` again with new password
- Restart dev server
- Login with new password

### Production:
- Go to Vercel Dashboard
- Update `ADMIN_PASSWORD` environment variable
- Trigger new deployment
- Use new password to login

---

## 📝 Credential Checklist

Before deploying to production:

- [ ] Changed `ADMIN_PASSWORD` to something strong
- [ ] Password has uppercase, lowercase, numbers, symbols
- [ ] Password is at least 12 characters long
- [ ] Did NOT commit `.env.local` to GitHub
- [ ] Added credentials to Vercel environment variables
- [ ] Tested login with new credentials locally
- [ ] Redeployed to Vercel after updating env vars

---

## 🎓 What NOT to Do

❌ Don't store credentials in your code  
❌ Don't push `.env.local` to GitHub  
❌ Don't use the same password everywhere  
❌ Don't use simple/guessable passwords  
❌ Don't share credentials via unencrypted channels  
❌ Don't hardcode admin credentials in components  

---

## ✅ Recommended Approach

1. **Local Development:** Use strong test password
   ```
   ADMIN_PASSWORD=MyPortfolio@Test#2024
   ```

2. **Production (Vercel):** Use different strong password
   ```
   ADMIN_PASSWORD=Prod$Admin@Secure#2024
   ```

3. **Never share** either password with anyone

---

## 🆘 Quick Reference

| Task | Steps |
|------|-------|
| Change local password | Edit `.env.local` → Restart → Test |
| Change production password | Vercel Setup → Env Vars → Update → Deploy |
| Forgot password | Re-edit and test again (both local & prod same process) |
| Check current password | Look in `.env.local` (local) or Vercel Dashboard (prod) |

---

**Remember:** Security is everyone's responsibility! 🛡️
