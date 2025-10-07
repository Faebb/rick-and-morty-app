"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useAuthStore } from "@/lib/useAuthStore";

export default function AuthButton() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return isAuthenticated ? (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700 hidden sm:inline">{user?.name}</span>
      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-md bg-red-50 text-red-600 text-sm hover:bg-red-100"
      >
        Cerrar sesión
      </button>
    </div>
  ) : (
    <Link href="/login" className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
      Iniciar sesión
    </Link>
  );
}
