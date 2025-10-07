// src/app/loading.tsx

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Skeleton para información */}
      <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />

      {/* Skeleton para grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="w-full h-64 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}