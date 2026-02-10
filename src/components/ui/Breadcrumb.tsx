import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm text-slate-600 ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <FaChevronRight className="w-4 h-4 text-slate-400 mx-2" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-purple-600 transition-colors"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
