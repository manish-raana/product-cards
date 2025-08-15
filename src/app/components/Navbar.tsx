"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a placeholder during SSR to prevent hydration mismatch
  const renderThemeButton = () => {
    if (!mounted) {
      return (
        <button className="p-2 rounded-md" disabled>
          <span className="w-6 h-6 block" />
        </button>
      );
    }

    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    );
  };

  return (
    <nav className="shadow-sm w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/" className="hover:text-primary transition-colors">
              ProductCard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">{renderThemeButton()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar