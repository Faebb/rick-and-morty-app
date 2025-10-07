'use client';

import { useState, useEffect } from 'react';
import { getEpisodes } from '@/lib/api';
import { Episode, EpisodeApiResponse, EpisodeFilters } from '@/types/episode';
import EpisodeCard from '@/components/EpisodeCard';
import Pagination from '@/components/Pagination';
import EpisodeFiltersComponent from '@/components/EpisodeFilters';

export default function EpisodesPage() {
  const [data, setData] = useState<EpisodeApiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EpisodeFilters>({});

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
      const result = await getEpisodes(currentPage, filters);
      setData(result);
    } catch (err) {
      setError('Error al cargar los episodios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: EpisodeFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
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
      {/* Título de la página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Episodios de Rick and Morty
        </h1>
        <p className="text-gray-600">
          Explora todos los episodios de la serie y descubre en cuáles aparecen tus personajes favoritos
        </p>
      </div>

      {/* Filtros */}
      <EpisodeFiltersComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Contenido */}
      {data && data.results.length > 0 ? (
        <>
          {/* Información de resultados */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {loading ? (
                <span className="inline-flex items-center">
                  <span className="animate-spin mr-2"></span>
                  Cargando...
                </span>
              ) : (
                <>
                  Mostrando <span className="font-semibold">{data.results.length}</span> de{' '}
                  <span className="font-semibold">{data.info.count}</span> episodios
                  {' • '}
                  Página <span className="font-semibold">{currentPage}</span> de{' '}
                  <span className="font-semibold">{data.info.pages}</span>
                </>
              )}
            </p>
          </div>

          {/* Grid de episodios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.results.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Paginación */}
          {data.info.pages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            No se encontraron episodios
          </p>
          <p className="text-gray-500 mb-6">
            Intenta ajustar los filtros de búsqueda
          </p>
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

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton título */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded w-96 animate-pulse" />
      </div>

      {/* Skeleton filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton info */}
      <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />

      {/* Skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="h-6 bg-gray-200 rounded w-20 mb-3 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}