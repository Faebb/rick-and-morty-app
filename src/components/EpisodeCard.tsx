// src/components/EpisodeCard.tsx

import Link from 'next/link';
import { Episode } from '@/types/episode';

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  // Extraer temporada y episodio del formato S01E01
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
    <Link href={`/episode/${episode.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Código del episodio */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            {episode.episode}
          </span>
        </div>

        {/* Nombre del episodio */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 flex-1">
          {episode.name}
        </h3>

        {/* Información adicional */}
        <div className="space-y-2 mt-auto">
          {/* Fecha de emisión */}
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📅</span>
            <span>{episode.air_date}</span>
          </div>

          {/* Temporada y episodio */}
          {episodeInfo && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📺</span>
              <span>
                Temporada {episodeInfo.season}, Episodio {episodeInfo.episode}
              </span>
            </div>
          )}

          {/* Número de personajes */}
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">👥</span>
            <span>
              {episode.characters.length}{' '}
              {episode.characters.length === 1 ? 'personaje' : 'personajes'}
            </span>
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