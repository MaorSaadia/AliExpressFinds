import Image from "next/image";
import Link from "next/link";
import { Copyright } from "lucide-react";

const Footer = () => {
  const socialIcons = [
    { name: "טיקטוק", icon: "tiktok", url: "https://www.tiktok.com/" },
    { name: "יוטיוב", icon: "youtube", url: "https://www.youtube.com/" },
    { name: "אינסטגרם", icon: "instagram", url: "https://www.instagram.com/" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-stone-800 border-t border-orange-500" dir="rtl">
      <div className="container mx-auto px-4 py-4">
        {/* Content Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-6">
          {/* Logo/Brand Name */}
          <Link href="/">
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              <span className="text-orange-500">Ali</span>
              <span className="text-red-700">Express</span>
              <span className="text-orange-500">Finds</span>
            </span>
          </Link>

          {/* About Text */}
          <p className="text-sm text-gray-600 max-w-md dark:text-gray-200">
            אנחנו מאתרים את המוצרים הטובים ביותר מאליאקספרס כדי לעזור לכם למצוא
            עסקאות מדהימות ופריטים מובילים ממוכרים מהימנים.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialIcons.map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group transition-transform hover:scale-110"
              >
                <Image
                  src={`/${social.icon}.png`}
                  alt={social.name}
                  width={24}
                  height={24}
                />
                <span className="mb-1 absolute bottom-full right-1/2 transform translate-x-1/2 bg-orange-300/80 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-100">
              <Copyright className="h-4 w-4 ml-1 flex-shrink-0" />
              <span>{currentYear} כל הזכויות שמורות.</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-100">
              כשותפים של אליאקספרס אנו מרוויחים מרכישות מזכות.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
