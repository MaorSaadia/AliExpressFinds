import Link from "next/link";
import { Copyright } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-stone-800 border-t border-orange-500" dir="rtl">
      <div className="container mx-auto px-4 py-4">
        {/* Content Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-6">
          {/* Logo/Brand Name */}
          <Link href="/">
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              <span className="text-orange-500">אלי</span>
              <span className="text-red-700">אקספרס</span>
              <span className="text-orange-500">מציאות</span>
            </span>
          </Link>

          {/* About Text */}
          <p className="text-sm text-gray-600 max-w-md dark:text-gray-200">
            אנחנו מאתרים את המוצרים הטובים ביותר מאליאקספרס כדי לעזור לכם למצוא
            עסקאות מדהימות ופריטים מובילים ממוכרים מהימנים.
          </p>
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
