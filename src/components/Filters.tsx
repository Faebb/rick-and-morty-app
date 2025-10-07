'use client';

import { CharacterFilters } from '@/types/character';

interface FiltersProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
  onClearFilters: () => void;
}

export default function Filters({ filters, onFilterChange, onClearFilters }: FiltersProps) {
  const handleInputChange = (field: keyof CharacterFilters, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== undefined);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Filtro por nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ej: Rick"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por estado */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Filtro por especie */}
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
            Especie
          </label>
          <input
            type="text"
            id="species"
            value={filters.species || ''}
            onChange={(e) => handleInputChange('species', e.target.value)}
            placeholder="Ej: Human"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por tipo */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <input
            type="text"
            id="type"
            value={filters.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
            placeholder="Ej: Genetic experiment"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por género */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Género
          </label>
          <select
            id="gender"
            value={filters.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
      </div>
    </div>
  );
}