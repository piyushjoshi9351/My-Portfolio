import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Piyush Joshi - AI/ML Engineer & Full Stack Developer',
  description: 'Piyush Joshi\'s professional portfolio. Aspiring AI/ML engineer with expertise in Python, React, and machine learning. Explore my projects and connect with me.',
  keywords: 'AI, ML, machine learning, full stack developer, portfolio, Piyush Joshi',
  authors: [{ name: 'Piyush Joshi' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://piyushjoshi.com',
    siteName: 'Piyush Joshi Portfolio',
    title: 'Piyush Joshi - AI/ML Engineer & Full Stack Developer',
    description: 'Professional portfolio showcasing AI/ML projects and full stack development skills',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
