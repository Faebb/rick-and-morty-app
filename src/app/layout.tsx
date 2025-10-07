// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import ActiveNavLink from "@/components/ActiveNavLink";
import MobileNav from "@/components/MobileNav";
import AuthButton from "@/components/AuthButton";
import "./globals.css";
import RequireAuth from '@/components/RequireAuth';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty App",
  description: "Explora el universo de Rick and Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Rick and Morty
                </h1>
                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                  Explorador del Multiverso
                </p>
              </Link>

              {/* Navegación Desktop */}
              <nav className="hidden md:flex items-center space-x-1">
                <ActiveNavLink href="/" label="Personajes" icon="👤" />
                <ActiveNavLink href="/location" label="Locaciones" icon="🌍" />
                <ActiveNavLink href="/episode" label="Episodios" icon="📺" />
              </nav>

              {/* Navegación Móvil */}
              <div className="flex items-center gap-4">
                <AuthButton />
                <MobileNav />
              </div>
            </div>
          </div>
        </header>
        {/* Contenido principal (protegido) */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RequireAuth>{children}</RequireAuth>
        </main>
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-500">
              Datos provistos por{" "}
              <a
                href="https://rickandmortyapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                The Rick and Morty API
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
