'use client';

import { EpisodeFilters } from '@/types/episode';

interface EpisodeFiltersProps {
  filters: EpisodeFilters;
  onFilterChange: (filters: EpisodeFilters) => void;
  onClearFilters: () => void;
}

export default function EpisodeFiltersComponent({
  filters,
  onFilterChange,
  onClearFilters,
}: EpisodeFiltersProps) {
  const handleInputChange = (field: keyof EpisodeFilters, value: string) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro por nombre */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre del episodio
          </label>
          <input
            type="text"
            id="name"
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ej: Pilot"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por código de episodio */}
        <div>
          <label
            htmlFor="episode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Código de episodio
          </label>
          <input
            type="text"
            id="episode"
            value={filters.episode || ''}
            onChange={(e) => handleInputChange('episode', e.target.value)}
            placeholder="Ej: S01E01 o S01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Usa S01E01 para episodio específico o S01 para toda la temporada
          </p>
        </div>
      </div>
    </div>
  );
}