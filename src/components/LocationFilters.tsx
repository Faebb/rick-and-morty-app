'use client';

import { LocationFilters } from '@/types/location';

interface LocationFiltersProps {
  filters: LocationFilters;
  onFilterChange: (filters: LocationFilters) => void;
  onClearFilters: () => void;
}

export default function LocationFiltersComponent({
  filters,
  onFilterChange,
  onClearFilters,
}: LocationFiltersProps) {
  const handleInputChange = (field: keyof LocationFilters, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== '' && value !== undefined
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por nombre */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ej: Earth"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por tipo */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo
          </label>
          <input
            type="text"
            id="type"
            value={filters.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
            placeholder="Ej: Planet"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por dimensión */}
        <div>
          <label
            htmlFor="dimension"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dimensión
          </label>
          <input
            type="text"
            id="dimension"
            value={filters.dimension || ''}
            onChange={(e) => handleInputChange('dimension', e.target.value)}
            placeholder="Ej: C-137"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}