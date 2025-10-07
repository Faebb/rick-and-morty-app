// src/app/episode/[id]/loading.tsx

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Skeleton botón volver */}
      <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse" />

      {/* Skeleton header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="h-8 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton personajes */}
      <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="w-full aspect-square bg-gray-200 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}