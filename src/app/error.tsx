// src/app/error.tsx
'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Algo salió mal
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message || 'Error al cargar los personajes'}
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}