import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumbs({
  items,
  separator = <ChevronLeft className="h-4 w-4" />,
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center text-sm justify-end", className)}
      dir="rtl"
      {...props}
    >
      <ol className="flex items-center space-x-reverse space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-300 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">בית</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-reverse space-x-2"
          >
            <span className="text-gray-400">{separator}</span>
            {item.current ? (
              <span
                className="font-medium text-orange-500 dark:text-orange-300"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-300 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
