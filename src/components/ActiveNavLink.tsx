// src/components/ActiveNavLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ActiveNavLinkProps {
  href: string;
  label: string;
  icon?: string;
}

export default function ActiveNavLink({ href, label, icon }: ActiveNavLinkProps) {
  const pathname = usePathname();
  
  // Verificar si la ruta actual coincide
  const isActive = href === '/' 
    ? pathname === '/' 
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}