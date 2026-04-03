import "./globals.css";

export const metadata = {
  title: "Al-Moatasem Bellah • Full-Stack OS Portfolio",
  description: "Explore the interactive Windows XP-themed developer portfolio of Al-Moatasem Bellah. Experience creative web engineering, retro design, and full-stack development skills in a nostalgic OS format.",
  keywords: ["Al-Moatasem", "Portfolio", "Full-Stack Developer", "Next.js", "React", "Windows XP", "OS Portfolio", "Software Engineer"],
  authors: [{ name: "Al-Moatasem Bellah" }],
  icons: {
    icon: "https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png",
    shortcut: "https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png",
  },
  openGraph: {
    title: "Al-Moatasem Bellah • Full-Stack OS Portfolio",
    description: "An incredibly immersive Windows XP interactive developer portfolio. Step inside and explore!",
    url: "https://your-vercel-domain.vercel.app",
    siteName: "Moatasem OS",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Windows_logo_-_2021.svg",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden bg-black text-white">
        {children}
      </body>
    </html>
  );
}
