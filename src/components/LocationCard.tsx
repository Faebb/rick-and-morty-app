import Link from 'next/link';
import { Location } from '@/types/location';

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <Link href={`/location/${location.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer h-full">
        {/* Nombre de la locación */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {location.name}
        </h3>

        {/* Información principal */}
        <div className="space-y-3">
          {/* Tipo */}
          <div className="flex items-start">
            <span className="text-2xl mr-3"></span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Tipo
              </p>
              <p className="text-sm text-gray-900 truncate">
                {location.type || 'Desconocido'}
              </p>
            </div>
          </div>

          {/* Dimensión */}
          <div className="flex items-start">
            <span className="text-2xl mr-3"></span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Dimensión
              </p>
              <p className="text-sm text-gray-900 truncate">
                {location.dimension || 'Desconocida'}
              </p>
            </div>
          </div>

          {/* Residentes */}
          <div className="flex items-start">
            <span className="text-2xl mr-3"></span>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Residentes
              </p>
              <p className="text-sm text-gray-900">
                {location.residents.length}{' '}
                {location.residents.length === 1 ? 'residente' : 'residentes'}
              </p>
            </div>
          </div>
        </div>

        {/* Indicador de más información */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-blue-600 font-medium">
            Ver detalles →
          </span>
        </div>
      </div>
    </Link>
  );
}