import './globals.css';
import '../styles/theme.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Un-commented and fixed path
import { ThemeProvider } from '@/components/ThemeProvider';

// --- METADATA DEFINITION ---
export const metadata = {
  title: {
    default: "Ebuka Ezike | Freelance IT Consultant | Full Stack Web Developer | Technical Support Engineer | Technical Virtual Assistant | IT Support Specialist | Video Editor & Content Creator | Technical Editor/Writer",
    template: "%s | Ebuka Ezike",
  },
  description: "Professional portfolio of Ebuka Ezike. 5+ years of experience specializing in remote IT support, web development, and digital media[cite: 5, 45]. Proven track record of delivering 96% reduction in load times and 95% first-contact resolution.",
  keywords: ["Ebuka Ezike", "Freelance IT Consultant", "Full Stack Web Developer", "Technical Support Engineer", "Technical Virtual Assistant", "IT Support Specialist", "Video Editor", "Technical Writer", "Nigeria", "Remote Contractor"],
  authors: [{ name: "Ebuka Ezike" }],
  creator: "Ebuka Ezike",
  // Icons are auto-detected, but defining them here ensures compatibility with all browsers
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  // Social Media Previews
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://localhost:3000", // Update this when you deploy
    title: "Ebuka Ezike | Freelance IT Consultant | Full Stack Web Developer",
    description: "Expert troubleshooting, system automation, and high-performance web development for U.S./EMEA-based organizations.",
    siteName: "Ebuka Ezike Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebuka Ezike | IT Support Specialist | Web Developer",
    description: "5+ years of experience in IT Support and Web Development. Expert in React.js and Microsoft 365.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* suppressHydrationWarning is added because ThemeProvider modifies classes on <html> */}
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* flex-grow ensures the footer stays at the bottom on short pages */}
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}