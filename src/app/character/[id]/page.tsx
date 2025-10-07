import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCharacterById, getEpisodesByUrls } from '@/lib/api';

interface CharacterDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  let character;
  let episodes;

  try {
    character = await getCharacterById(params.id);
    episodes = await getEpisodesByUrls(character.episode);
  } catch (error) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'text-green-600 bg-green-50';
      case 'Dead':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Botón de regreso */}
      <Link
        href="/"
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
        Volver a la lista
      </Link>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          {/* Imagen del personaje */}
          <div className="md:w-2/5 relative h-96 md:h-auto">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>

          {/* Información del personaje */}
          <div className="md:w-3/5 p-8">
            {/* Nombre y estado */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {character.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getStatusDot(character.status)}`} />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(character.status)}`}>
                  {character.status}
                </span>
              </div>
            </div>

            {/* Información detallada */}
            <div className="space-y-4">
              {/* Especie y Género */}
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Especie" value={character.species} />
                <InfoItem label="Género" value={character.gender} />
              </div>

              {/* Tipo (si existe) */}
              {character.type && (
                <InfoItem label="Tipo" value={character.type} />
              )}

              {/* Origen */}
              <InfoItem
                label="Origen"
                value={character.origin.name}
              />

              {/* Última ubicación */}
              <InfoItem
                label="Última ubicación conocida"
                value={character.location.name}
              />

              {/* Número de episodios */}
              <InfoItem
                label="Apariciones"
                value={`${character.episode.length} episodios`}
              />

              {/* Fecha de creación */}
              <InfoItem
                label="Creado en la base de datos"
                value={new Date(character.created).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de episodios */}
      {episodes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Episodios ({episodes.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {episodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/episode/${episode.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                            {episode.episode}
                          </span>
                          <p className="font-semibold text-gray-900">
                            {episode.name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {episode.air_date}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 ml-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente helper para mostrar información
function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="border-l-4 border-blue-500 pl-4">
      <p className="text-sm font-medium text-gray-500 mb-1">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </p>
      <p className="text-base text-gray-900">{value}</p>
    </div>
  );
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: CharacterDetailPageProps) {
  try {
    const character = await getCharacterById(params.id);
    return {
      title: `${character.name} - Rick and Morty`,
      description: `Información detallada sobre ${character.name}: ${character.status}, ${character.species}, ${character.gender}`,
    };
  } catch {
    return {
      title: 'Personaje no encontrado',
    };
  }
}