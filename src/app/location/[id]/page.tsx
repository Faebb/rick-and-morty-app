import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocationById, getCharactersByUrls } from '@/lib/api';

interface LocationDetailPageProps {
  params: {
    id: string;
  };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  let location;
  let residents;

  try {
    location = await getLocationById(params.id);
    // Solo cargar los primeros 20 residentes para no sobrecargar
    const residentUrls = location.residents.slice(0, 20);
    residents = await getCharactersByUrls(residentUrls);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Botón de regreso */}
      <Link
        href="/location"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver a locaciones
      </Link>

      {/* Header de la locación */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {location.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tipo */}
          <div className="flex items-start space-x-3">
            <span className="text-3xl"></span>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Tipo
              </p>
              <p className="text-lg text-gray-900">
                {location.type || 'Desconocido'}
              </p>
            </div>
          </div>

          {/* Dimensión */}
          <div className="flex items-start space-x-3">
            <span className="text-3xl"></span>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Dimensión
              </p>
              <p className="text-lg text-gray-900">
                {location.dimension || 'Desconocida'}
              </p>
            </div>
          </div>

          {/* Total de residentes */}
          <div className="flex items-start space-x-3">
            <span className="text-3xl"></span>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Total de Residentes
              </p>
              <p className="text-lg text-gray-900">
                {location.residents.length}{' '}
                {location.residents.length === 1 ? 'residente' : 'residentes'}
              </p>
            </div>
          </div>
        </div>

        {/* Fecha de creación */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Creado en la base de datos:</span>{' '}
            {new Date(location.created).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Sección de residentes */}
      {residents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Residentes Conocidos
            {location.residents.length > 20 && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                (Mostrando 20 de {location.residents.length})
              </span>
            )}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {residents.map((character) => (
              <Link
                key={character.id}
                href={`/character/${character.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {character.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {character.species}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje si no hay residentes */}
      {location.residents.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay residentes conocidos
          </h3>
          <p className="text-gray-500">
            Esta locación no tiene residentes registrados en la base de datos
          </p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: LocationDetailPageProps) {
  try {
    const location = await getLocationById(params.id);
    return {
      title: `${location.name} - Locaciones`,
      description: `Información sobre ${location.name}: ${location.type} en ${location.dimension}`,
    };
  } catch {
    return {
      title: 'Locación no encontrada',
    };
  }
}