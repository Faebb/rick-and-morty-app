// src/app/character/[id]/loading.tsx

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Skeleton botón volver */}
      <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse" />

      {/* Skeleton contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          {/* Skeleton imagen */}
          <div className="md:w-2/5 h-96 bg-gray-200 animate-pulse" />

          {/* Skeleton información */}
          <div className="md:w-3/5 p-8 space-y-6">
            {/* Skeleton nombre */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            </div>

            {/* Skeleton info items */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton episodios */}
      <div className="mt-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}