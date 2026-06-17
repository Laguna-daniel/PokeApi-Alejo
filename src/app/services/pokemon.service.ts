import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, forkJoin, map } from 'rxjs';
import { PokemonListResponse, PokemonDetailResponse, Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  // Endpoint de partida según la guía
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  
  getPokemons(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;

    return this.http.get<PokemonListResponse>(url).pipe(
      
     
      switchMap((response: PokemonListResponse) => {
        
        const detailRequests: Observable<PokemonDetailResponse>[] = response.results.map(
          pokemon => this.http.get<PokemonDetailResponse>(pokemon.url)
        );

        
        return forkJoin(detailRequests);
      }),

      
      map((detailedPokemons: PokemonDetailResponse[]) => {
        
        
        return detailedPokemons.map(poke => {
          const cleanPokemon: Pokemon = {
            id: poke.id,
            name: poke.name,
            image: poke.sprites.front_default,
            height: poke.height,
            weight: poke.weight,
            baseExperience: poke.base_experience
          };
          return cleanPokemon;
        });
        
      })
    );
  }
}