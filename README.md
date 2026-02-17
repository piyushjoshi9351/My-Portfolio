# Piyush Joshi - AI/ML Engineer Portfolio

A modern, dynamic portfolio website built with Next.js, TypeScript, and Supabase. Features a fully functional admin panel for managing projects, skills, experience, and achievements without rebuilding or redeploying.

## 🚀 Features

✅ **Dynamic Admin Panel** - Manage all portfolio content from a web dashboard  
✅ **Supabase Integration** - Cloud database for persistent data storage  
✅ **Real-time Updates** - Changes appear instantly on the main site  
✅ **No Deployment Required** - Update content without rebuilding  
✅ **Responsive Design** - Beautiful UI on all devices  
✅ **Contact Form** - Integrated with Formspree for email delivery  
✅ **SEO Optimized** - Metadata and Open Graph tags included  
✅ **Smooth Animations** - GSAP and Tailwind CSS animations  
✅ **3D Elements** - Three.js powered interactive experiences  

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.5.9, React 19, TypeScript
- **Styling:** Tailwind CSS, GSAP animations
- **Database:** Supabase (PostgreSQL)
- **Form Handling:** React Hook Form + Zod
- **Email:** Formspree
- **UI Components:** Radix UI
- **3D Graphics:** Three.js
- **Icons:** Lucide React

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/piyushjoshi9351/My-Portfolio.git
cd My-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://vzmpbvpfqwaprsegayag.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_zKGHomRUF9nNx7IVvTtUDA_0l5bWJ4e
ADMIN_USERNAME=piyush
ADMIN_PASSWORD=MyPassword123
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:9002`

## 🎯 Admin Panel

### Access Admin Panel
```
URL: http://localhost:9002/admin/login
Username: piyush
Password: MyPassword123
```

### Manage Content

**Projects Tab**
- Add/edit/delete projects
- Manage technologies and links
- Track on GitHub URLs and live demos

**Skills Tab**
- Add technical and soft skills
- Set proficiency levels (1-100)
- Organize by category

**Experience Tab**
- Add work experience entries
- Track company, position, and duration
- List skills used per role

**Achievements Tab**
- Add certifications and awards
- Set achievement dates and icons
- Customize descriptions

## 📝 Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous public key |
| `ADMIN_USERNAME` | ✅ | Admin panel login username |
| `ADMIN_PASSWORD` | ✅ | Admin panel login password |

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

After deployment:
- Use `/admin/login` to manage content
- Changes sync instantly without re-deployment
- Website always shows latest data

## 📱 Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/page.tsx  # Login page
│   │   ├── page.tsx        # Dashboard
│   │   └── tabs/           # Admin section components
│   ├── api/
│   │   ├── admin/          # Admin API routes
│   │   ├── contact/        # Contact form API
│   │   └── seed/           # Database seeding
│   └── page.tsx            # Main portfolio page
├── components/             # React components
│   ├── ui/                 # Radix UI components
│   └── *-section.tsx       # Portfolio sections
└── lib/
    ├── supabase.ts         # Supabase client & types
    ├── portfolio-data.ts   # Static data (fallback)
    └── utils.ts            # Utility functions
```

## 🔄 Data Flow

```
Admin Panel Input
        ↓
Supabase Database
        ↓
Component Fetch (useEffect)
        ↓
Real-time Website Update
```

## 🎨 Customization

### Change Admin Credentials
Edit `.env.local`:
```
ADMIN_USERNAME=yourusername
ADMIN_PASSWORD=yourpassword
```

Restart dev server for changes to take effect.

### Modify Portfolio Sections
Edit component files in `src/components/`
- All components fetch live data from Supabase
- Static fallbacks for development

### Add New Sections
1. Create database table in Supabase
2. Add types to `src/lib/supabase.ts`
3. Create component that fetches from new table
4. Add admin management UI in `src/app/admin/tabs/`

## 📖 Documentation

- **[Admin Guide](./ADMIN_GUIDE.md)** - Complete admin panel usage guide
- **[Deployment Guide](./DEPLOYMENT.md)** - Step-by-step deployment instructions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Piyush Joshi**
- GitHub: [@piyushjoshi9351](https://github.com/piyushjoshi9351)
- LinkedIn: [@piyush-joshi](https://linkedin.com/in/piyush-joshi-18a152277)
- LeetCode: [@Piyush_Joshi93](https://leetcode.com/u/Piyush_Joshi93)

## 📧 Contact

For questions or feedback, please use the contact form on the website or reach out directly.

---

**Built with ❤️ by Piyush Joshi**
