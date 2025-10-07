'use client';

import { useState, useEffect } from 'react';
import { getLocations } from '@/lib/api';
import { Location, LocationApiResponse, LocationFilters } from '@/types/location';
import LocationCard from '@/components/LocationCard';
import Pagination from '@/components/Pagination';
import LocationFiltersComponent from '@/components/LocationFilters';

export default function LocationsPage() {
  const [data, setData] = useState<LocationApiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LocationFilters>({});

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
      const result = await getLocations(currentPage, filters);
      setData(result);
    } catch (err) {
      setError('Error al cargar las locaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: LocationFilters) => {
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
          Locaciones del Multiverso
        </h1>
        <p className="text-gray-600">
          Explora los diferentes lugares del universo de Rick and Morty
        </p>
      </div>

      {/* Filtros */}
      <LocationFiltersComponent
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
                  <span className="font-semibold">{data.info.count}</span> locaciones
                  {' • '}
                  Página <span className="font-semibold">{currentPage}</span> de{' '}
                  <span className="font-semibold">{data.info.pages}</span>
                </>
              )}
            </p>
          </div>

          {/* Grid de locaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.results.map((location) => (
              <LocationCard key={location.id} location={location} />
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
            No se encontraron locaciones
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton info */}
      <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />

      {/* Skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}