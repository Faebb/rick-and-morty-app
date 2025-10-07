'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  return (
    <div className="md:hidden">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Menú"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">👤</span>
              <span className="font-medium">Personajes</span>
            </Link>
            <Link
              href="/location"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive('/location')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">🌍</span>
              <span className="font-medium">Locaciones</span>
            </Link>
            <Link
              href="/episode"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive('/episode')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">📺</span>
              <span className="font-medium">Episodios</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}