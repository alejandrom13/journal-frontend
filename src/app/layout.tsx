import type { Metadata } from "next";
import "@/styles/global.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitcher from "@/components/theme-switcher";
import { Toaster } from "@/components/ui/sonner";
import "./prosemirror.css";
import "react-day-picker/style.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://journal-self.vercel.app/"),
  title: "Jana - Your Personal AI Journal",
  description:
    "Jana is your personal AI journal that helps you reflect on your thoughts and feelings.",
  openGraph: {
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/bg.png",
        width: 1200,
        height: 630,
        alt: "Jana - Your Personal AI Journal",
      },
    ],
  },
  twitter: {
    title: "Jana - Your Personal AI Journal",
    description:
      "Jana is your personal AI journal that helps you reflect on your thoughts and feelings.",
    images: [
      {
        url: "/bg.png",
        width: 1200,
        height: 630,
        alt: "Jana - Your Personal AI Journal",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
          style={{
            background:
              "linear-gradient(to bottom, var(--background-start), var(--background-end))",
            transition: `all var(--transition-duration) ease-in-out`,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="default"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
