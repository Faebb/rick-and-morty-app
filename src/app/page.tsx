// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getCharacters } from '@/lib/api';
import { ApiResponse, CharacterFilters } from '@/types/character';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
import { useCharacterStore } from '@/lib/useCharacterStore';

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = useCharacterStore((s) => s.currentPage);
  const filters = useCharacterStore((s) => s.filters);
  const setPage = useCharacterStore((s) => s.setPage);
  const setFilters = useCharacterStore((s) => s.setFilters);
  const clearFilters = useCharacterStore((s) => s.clearFilters);

  // Debounce para búsqueda por nombre y cambios de página/filtros
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, filters]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCharacters(currentPage, filters);
      setData(result);
    } catch (err) {
      setError('Error al cargar los personajes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: CharacterFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  if (loading && !data) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
        <button
          onClick={() => fetchData()}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Información de resultados */}
      {data && data.results.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {loading ? (
                <span className="inline-flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Cargando...
                </span>
              ) : (
                <>
                  Mostrando <span className="font-semibold">{data.results.length}</span> de{' '}
                  <span className="font-semibold">{data.info.count}</span> personajes
                  {' • '}
                  Página <span className="font-semibold">{currentPage}</span> de{' '}
                  <span className="font-semibold">{data.info.pages}</span>
                </>
              )}
            </p>
          </div>

          {/* Grid de personajes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* Paginación */}
          {data.info.pages > 1 && (
            <Pagination currentPage={currentPage} totalPages={data.info.pages} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl font-semibold text-gray-700 mb-2">No se encontraron personajes</p>
          <p className="text-gray-500 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}

// Componente de loading
function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton para filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton info */}
      <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />

      {/* Skeleton grid */}
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