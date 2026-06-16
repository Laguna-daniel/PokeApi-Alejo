import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Variables para controlar la paginación
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargarPokemons();
  }

  cargarPokemons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Ahora le pasamos limit y offset al servicio
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar Pokémon', err);
        this.errorMessage = 'Ocurrió un error de conexión con la PokéAPI. Intenta de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }

  // Función para ir a la siguiente página
  nextPage(): void {
    this.offset += this.limit; 
    this.cargarPokemons();     
  }

  // Función para retroceder de página
  previousPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit; 
      this.cargarPokemons();     
    }
  }
}