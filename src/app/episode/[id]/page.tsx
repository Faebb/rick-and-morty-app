// src/app/episode/[id]/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getEpisodeById, getCharactersByUrls } from '@/lib/api';

interface EpisodeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function EpisodeDetailPage({ params }: EpisodeDetailPageProps) {
  let episode;
  let characters;

  try {
    episode = await getEpisodeById(params.id);
    // Cargar los primeros 40 personajes para no sobrecargar
    const characterUrls = episode.characters.slice(0, 40);
    characters = await getCharactersByUrls(characterUrls);
  } catch (error) {
    notFound();
  }

  // Extraer temporada y episodio
  const parseEpisodeCode = (code: string) => {
    const match = code.match(/S(\d+)E(\d+)/);
    if (match) {
      return {
        season: parseInt(match[1]),
        episode: parseInt(match[2]),
      };
    }
    return null;
  };

  const episodeInfo = parseEpisodeCode(episode.episode);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Botón de regreso */}
      <Link
        href="/episode"
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
        Volver a episodios
      </Link>

      {/* Header del episodio */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        {/* Código del episodio */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
            {episode.episode}
          </span>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {episode.name}
        </h1>

        {/* Información principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fecha de emisión */}
          <div className="flex items-start space-x-3">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Fecha de emisión
              </p>
              <p className="text-lg text-gray-900">{episode.air_date}</p>
            </div>
          </div>

          {/* Temporada y episodio */}
          {episodeInfo && (
            <div className="flex items-start space-x-3">
              <span className="text-3xl">📺</span>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Temporada y episodio
                </p>
                <p className="text-lg text-gray-900">
                  Temporada {episodeInfo.season}, Episodio {episodeInfo.episode}
                </p>
              </div>
            </div>
          )}

          {/* Total de personajes */}
          <div className="flex items-start space-x-3">
            <span className="text-3xl">👥</span>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Personajes
              </p>
              <p className="text-lg text-gray-900">
                {episode.characters.length}{' '}
                {episode.characters.length === 1 ? 'personaje' : 'personajes'}
              </p>
            </div>
          </div>
        </div>

        {/* Fecha de creación */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Creado en la base de datos:</span>{' '}
            {new Date(episode.created).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Sección de personajes */}
      {characters.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Personajes en este episodio
            {episode.characters.length > 40 && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                (Mostrando 40 de {episode.characters.length})
              </span>
            )}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {characters.map((character) => (
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
    </div>
  );
}

export async function generateMetadata({ params }: EpisodeDetailPageProps) {
  try {
    const episode = await getEpisodeById(params.id);
    return {
      title: `${episode.episode}: ${episode.name} - Episodios`,
      description: `Episodio "${episode.name}" emitido el ${episode.air_date} con ${episode.characters.length} personajes`,
    };
  } catch {
    return {
      title: 'Episodio no encontrado',
    };
  }
}