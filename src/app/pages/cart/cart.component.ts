import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pokemon } from '../../models/pokemon-types';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { LoggerService } from '../../services/logger/logger.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shard.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [LoggerService],
  imports: [CommonModule, SharedModule]
})
export class CartComponent implements OnInit, OnDestroy {
  pokemons$!: Observable<Pokemon[]>;
  pokemonListSub!: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService
  ) { }

  // In a different approach we can use resolver to get the data
  ngOnInit(): void {
    this.logger.debug('init Cart Page');
    // listen to changes on cart list add/remove
    this.pokemonListSub = this.pokemonService.updateCart.subscribe((update) => {
       if (update) {
        this.pokemons$ = this.pokemonService.CartList$;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pokemonListSub) {
      this.pokemonListSub.unsubscribe();
    }
  }
}
