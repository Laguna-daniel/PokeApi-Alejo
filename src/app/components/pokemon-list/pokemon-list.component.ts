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

  
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargarPokemons();
  }

  cargarPokemons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar Pokemon', err);
        this.errorMessage = 'Ocurrio un error de conexion con la PokeAPI. Intenta de nuevo mas tarde.';
        this.isLoading = false;
      }
    });
  }

  
  nextPage(): void {
    this.offset += this.limit; 
    this.cargarPokemons();     
  }

  
  previousPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit; 
      this.cargarPokemons();     
    }
  }
}