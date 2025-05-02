"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing during SSR
  if (!mounted) {
    // Use a completely empty div during SSR - no classes that might change
    return <div className="w-8 h-8" />;
  }

  return (
    <button 
      className="btn bg-accent text-background" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}