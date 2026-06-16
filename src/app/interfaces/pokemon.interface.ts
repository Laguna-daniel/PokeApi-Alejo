// src/app/interfaces/pokemon.interface.ts

// 1. Interfaces para el endpoint de la lista inicial
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

// 2. Interfaz para la respuesta cruda del detalle del Pokémon de la API
export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string; // Aquí viene la URL de la imagen
  };
}

// 3. Interfaz final mapeada (La que usaremos limpia en nuestro componente)
export interface Pokemon {
  id: number;
  name: string;
  image: string; 
  height: number;
  weight: number;
  baseExperience: number;
}