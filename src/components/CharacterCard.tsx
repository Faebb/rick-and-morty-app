// src/components/CharacterCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const getStatusColor = (status: string) => {
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
    <Link href={`/character/${character.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer">
        {/* Imagen del personaje */}
        <div className="relative w-full h-64">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Información del personaje */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {character.name}
          </h2>

          {/* Estado y especie */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2 h-2 rounded-full ${getStatusColor(character.status)}`} />
            <span className="text-sm text-gray-600">
              {character.status} - {character.species}
            </span>
          </div>

          {/* Ubicación */}
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-700">Última ubicación:</p>
            <p className="truncate">{character.location.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}