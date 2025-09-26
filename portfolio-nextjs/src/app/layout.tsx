import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aftab Pathan - Full Stack Developer',
  description: 'Portfolio of Aftab Pathan - Full Stack Developer specializing in modern web technologies',
  keywords: ['Aftab Pathan', 'Full Stack Developer', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Aftab Pathan' }],
  creator: 'Aftab Pathan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aftabpathan.dev',
    title: 'Aftab Pathan - Full Stack Developer',
    description: 'Portfolio of Aftab Pathan - Full Stack Developer specializing in modern web technologies',
    siteName: 'Aftab Pathan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aftab Pathan - Full Stack Developer',
    description: 'Portfolio of Aftab Pathan - Full Stack Developer specializing in modern web technologies',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}