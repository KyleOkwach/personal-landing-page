import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import ModelViewer from "./components/ModelViewer";
import ModelContainer from "./components/ModelContainer";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyle Bolo",
  description: "Welcome to my personal corner of the web!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value || 'dark'
  
  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.className = theme;
                  document.documentElement.style.colorScheme = theme;
                })();
              `,
            }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center w-full">
            <Navbar className="fixed w-full top-0 z-20" />
            <div className="flex flex-col relative items-center min-h-screen gap-4 md:w-[46rem]">
              <div className="flex absolute items-center justify-center md:h-[40rem] md:w-[40rem]">
                {/* Model Container */}
                <ModelContainer>
                  <ModelViewer
                    modelPath={"setup.glb"}
                    className="w-full h-full"
                  />
                </ModelContainer>
              </div>
              <div className="md:mt-[60%] z-10 md:mx-24 md:px-4">
                {children}
              </div>
              <footer className="flex flex-row items-center justify-center gap-2 text-sm font-medium text-text/50 mt-auto py-8">
                &copy; {new Date().getFullYear()} Kyle Bolo. All rights reserved.
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}