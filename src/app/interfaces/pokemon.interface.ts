
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


export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string; 
  };
}


export interface Pokemon {
  id: number;
  name: string;
  image: string; 
  height: number;
  weight: number;
  baseExperience: number;
}