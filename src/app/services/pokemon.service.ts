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

  // El método debe devolver un Observable<Pokemon[]> como exige el taller
  getPokemons(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;

    return this.http.get<PokemonListResponse>(url).pipe(
      
      // 1. switchMap: Cambiamos el flujo de la primera petición hacia las peticiones de detalle
      switchMap((response: PokemonListResponse) => {
        // Tomamos el arreglo 'results' y usamos el .map de JavaScript para crear un arreglo de peticiones
        const detailRequests: Observable<PokemonDetailResponse>[] = response.results.map(
          pokemon => this.http.get<PokemonDetailResponse>(pokemon.url)
        );

        // forkJoin agrupa todas las peticiones y espera a que TODAS terminen al mismo tiempo
        return forkJoin(detailRequests);
      }),

      // 2. map (de RxJS): Interceptamos la respuesta final del forkJoin para limpiarla
      map((detailedPokemons: PokemonDetailResponse[]) => {
        
        // Usamos nuevamente el .map de los Arrays para transformar la data
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