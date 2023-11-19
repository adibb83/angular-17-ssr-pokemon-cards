import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon-types';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { LoggerService } from '../../services/logger/logger.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shard.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LoggerService],
  imports:[CommonModule, SharedModule]
})
export class HomeComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService
  ) { }

  // In a different approach we can use resolver to get the data
  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemons$ = this.pokemonService.PokemonList$;
  }
}
