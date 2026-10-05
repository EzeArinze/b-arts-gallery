import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-providers";
import AuthProvider from "@/providers/auth-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ScriptComponent from "@/providers/script-component";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "B-Arts-Gallery",
  description: "Shop for the best and luxury arts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${anton.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster closeButton richColors position="top-right" />
          <ScriptComponent />
        </body>
      </html>
    </AuthProvider>
  );
}
