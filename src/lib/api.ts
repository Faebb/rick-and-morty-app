import { ApiResponse, Character, CharacterFilters} from '@/types/character';
import { Location, LocationApiResponse, LocationFilters } from '@/types/location';
import { Episode, EpisodeApiResponse, EpisodeFilters } from '@/types/episode';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

function buildFilteredUrl(page: number, filters: CharacterFilters): string {
  const params = new URLSearchParams();
  
  params.append('page', page.toString());
  
  if (filters.name?.trim()) {
    params.append('name', filters.name.trim());
  }
  
  if (filters.status) {
    params.append('status', filters.status);
  }
  
  if (filters.species?.trim()) {
    params.append('species', filters.species.trim());
  }
  
  if (filters.type?.trim()) {
    params.append('type', filters.type.trim());
  }
  
  if (filters.gender) {
    params.append('gender', filters.gender);
  }
  
  return `${API_BASE_URL}/character?${params.toString()}`;
}

/**
 * Obtiene personajes de la API con filtros opcionales
 */
export async function getCharacters(
  page: number = 1,
  filters: CharacterFilters = {}
): Promise<ApiResponse> {
  try {
    const url = buildFilteredUrl(page, filters);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      // Si no hay resultados, la API devuelve 404
      if (response.status === 404) {
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}

/**
 * Obtiene un personaje específico por ID
 */
export async function getCharacterById(id: string): Promise<Character> {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Personaje no encontrado: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
}

/**
 * Construye la URL con los filtros de locaciones
 */
function buildLocationFilteredUrl(page: number, filters: LocationFilters): string {
  const params = new URLSearchParams();
  
  params.append('page', page.toString());
  
  if (filters.name?.trim()) {
    params.append('name', filters.name.trim());
  }
  
  if (filters.type?.trim()) {
    params.append('type', filters.type.trim());
  }
  
  if (filters.dimension?.trim()) {
    params.append('dimension', filters.dimension.trim());
  }
  
  return `${API_BASE_URL}/location?${params.toString()}`;
}

/**
 * Obtiene locaciones con filtros opcionales
 */
export async function getLocations(
  page: number = 1,
  filters: LocationFilters = {}
): Promise<LocationApiResponse> {
  try {
    const url = buildLocationFilteredUrl(page, filters);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}

/**
 * Obtiene una locación específica por ID
 */
export async function getLocationById(id: string): Promise<Location> {
  try {
    const response = await fetch(`${API_BASE_URL}/location/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Locación no encontrada: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
}

/**
 * Obtiene múltiples personajes por sus URLs
 */
export async function getCharactersByUrls(urls: string[]): Promise<Character[]> {
  if (urls.length === 0) return [];
  
  try {
    // Extraer los IDs de las URLs
    const ids = urls.map(url => url.split('/').pop()).join(',');
    
    const response = await fetch(`${API_BASE_URL}/character/${ids}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Error al obtener personajes');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}

/**
 * Construye la URL con los filtros de episodios
 */
function buildEpisodeFilteredUrl(page: number, filters: EpisodeFilters): string {
  const params = new URLSearchParams();
  
  params.append('page', page.toString());
  
  if (filters.name?.trim()) {
    params.append('name', filters.name.trim());
  }
  
  if (filters.episode?.trim()) {
    params.append('episode', filters.episode.trim());
  }
  
  return `${API_BASE_URL}/episode?${params.toString()}`;
}

/**
 * Obtiene episodios con filtros opcionales
 */
export async function getEpisodes(
  page: number = 1,
  filters: EpisodeFilters = {}
): Promise<EpisodeApiResponse> {
  try {
    const url = buildEpisodeFilteredUrl(page, filters);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}

/**
 * Obtiene un episodio específico por ID
 */
export async function getEpisodeById(id: string): Promise<Episode> {
  try {
    const response = await fetch(`${API_BASE_URL}/episode/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Episodio no encontrado: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching episode:', error);
    throw error;
  }
}

// Actualizar la función getEpisodesByUrls que ya existía
export async function getEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  if (urls.length === 0) return [];
  
  try {
    const ids = urls.map(url => url.split('/').pop()).join(',');
    
    const response = await fetch(`${API_BASE_URL}/episode/${ids}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Error al obtener episodios');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}
