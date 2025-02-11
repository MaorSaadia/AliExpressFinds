"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { X, Moon, Sun, Monitor } from "lucide-react";
import Link from "next/link";

import HeaderSearchBar from "@/components/layout/HeaderSearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type HeaderProps = { categorySelector: React.ReactNode };

const Header = ({ categorySelector }: HeaderProps) => {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < prevScrollY;

      setIsScrolled(currentScrollY > 0);

      if (scrolledUp) {
        setIsOpen(true);
      } else if (currentScrollY > 100) {
        setIsOpen(false);
      }

      setPrevScrollY(currentScrollY);
    };

    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full" dir="rtl" lang="he">
      <div
        className={`w-full transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`relative w-full border-b bg-background/95 backdrop-blur-md transition-shadow duration-300 ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          {/* Orange line decoration */}
          <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-l from-orange-400 via-orange-500 to-orange-400" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Right section - Categories (switched from left) */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="rounded-lg p-2 text-foreground hover:bg-accent md:hidden"
                  aria-label="פתח תפריט"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div className="hidden md:flex items-center gap-2">
                  {categorySelector}
                </div>
              </div>

              {/* Center section - Logo */}
              <div className="flex-1 text-center">
                <Link href="/" className="inline-block">
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="text-orange-500">Ali</span>
                    <span className="text-red-700">Express</span>
                    <span className="text-orange-500">Finds</span>
                  </span>
                </Link>
              </div>

              {/* Left section - Search and Theme (switched from right) */}
              <div className="flex items-center gap-2">
                <HeaderSearchBar />
                {mounted && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">החלף מצב תצוגה</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[8rem]">
                      <DropdownMenuItem
                        onClick={() => setTheme("light")}
                        className="flex flex-row-reverse"
                      >
                        <Sun className="mr-2 h-4 w-4" />
                        בהיר
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setTheme("dark")}
                        className="flex flex-row-reverse"
                      >
                        <Moon className="mr-2 h-4 w-4" />
                        כהה
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setTheme("system")}
                        className="flex flex-row-reverse"
                      >
                        <Monitor className="mr-2 h-4 w-4" />
                        מערכת
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform bg-background transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-orange-500">Ali</span>
              <span className="text-red-700">Express</span>
              <span className="text-orange-500">Finds</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-lg p-2 text-foreground hover:bg-accent"
            aria-label="סגור תפריט"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="h-full overflow-y-auto pb-16">
          <div className="p-4">
            <nav className="space-y-2">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                {categorySelector}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
