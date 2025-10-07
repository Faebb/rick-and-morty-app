'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-16">
        <div className="text-6xl mb-4"></div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Episodio no encontrado
        </h1>
        <p className="text-gray-600 mb-8">
          El episodio que buscas no existe o fue borrado del cable interdimensional
        </p>
        <Link
          href="/episode"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a episodios
        </Link>
      </div>
    </div>
  );
}