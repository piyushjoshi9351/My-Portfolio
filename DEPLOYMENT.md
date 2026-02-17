# Deployment Guide

## Quick Start

This portfolio is built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**.

### Prerequisites
- Node.js 18+ and npm
- SendGrid account (for contact form emails)

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** (create `.env.local`):
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your values:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   CONTACT_EMAIL=piyushjoshi4918@gmail.com
   SENDGRID_FROM=your-verified-sender@domain.com
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```
   Visit **http://localhost:9002**

---

## Deployment (Vercel - Recommended)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Portfolio: final polish"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables in Vercel:**
   - Go to **Project Settings → Environment Variables**
   - Add:
     - `SENDGRID_API_KEY` = your SendGrid API key
     - `CONTACT_EMAIL` = piyushjoshi4918@gmail.com
     - `SENDGRID_FROM` = your verified sender email

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-site.vercel.app`

---

## Deployment (Self-Hosted / Docker)

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start server:**
   ```bash
   npm start
   ```

3. **Set environment variables on your host** (not in code):
   - `SENDGRID_API_KEY`
   - `CONTACT_EMAIL`
   - `SENDGRID_FROM`

---

## Features

✅ **Responsive Design** — Mobile-first, works on all devices
✅ **3D Hero Animation** — Three.js robot animation
✅ **Smooth Animations** — GSAP-powered transitions
✅ **Dark Mode** — Professional dark theme with Tailwind CSS
✅ **Contact Form** — SendGrid email integration
✅ **SEO Optimized** — Open Graph tags, metadata
✅ **Performance** — Next.js optimizations, lazy loading
✅ **Accessibility** — Semantic HTML, ARIA labels

---

## Contact Form Setup

When a user submits the contact form:
1. Message is POSTed to `/api/contact`
2. Email is sent to `piyushjoshi4918@gmail.com`
3. User sees success/error toast

**No SendGrid key?** Messages are logged to server console (dev fallback).

---

## Pages & Sections

- **Hero** — Animated intro with 3D robot
- **About** — Bio and professional summary
- **Experience** — Education timeline
- **Skills** — Technical skills with proficiency levels
- **Projects** — Featured projects with links
- **Achievements** — Certifications and awards
- **Contact** — Email form (SendGrid-powered)
- **Footer** — Social links and quick nav

---

## Customization

### Change Contact Email
Edit `src/pages/api/contact.ts`:
```typescript
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'your-email@domain.com';
```

### Update Portfolio Data
Edit `src/lib/portfolio-data.ts`:
- Skills, projects, experience, achievements
- All data is exported as TypeScript objects

### Adjust Colors & Theme
Edit `tailwind.config.ts` and CSS variables in `src/app/globals.css`

---

## Performance Tips

- ✅ Images are optimized via Next.js `Image` component
- ✅ Animations use GSAP (GPU-accelerated)
- ✅ Code splitting enabled by default
- ✅ Consider adding ImageOptimizer for production

---

## Support & Issues

- Deploy issues? Check Vercel logs
- Contact form not working? Verify `SENDGRID_API_KEY` is set
- Need changes? Edit files in `src/components/` or `src/lib/`

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
