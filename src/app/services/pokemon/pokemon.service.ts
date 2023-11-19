import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon-types';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemonList = new BehaviorSubject<Pokemon[]>([]);
  private pokemonsSub = new Subscription();
  updateCart = new BehaviorSubject<boolean>(true);


  constructor(
    private logger: LoggerService,
    private apiClient: ApiClientService
  ) { }

  get PokemonList$() {
    return this.pokemonList.asObservable();
  }

  // There's another way we could keep a cart list.
  // Have a separate list of products in the cart and add / remove products to the list by Id.
  // And view it separately.
  // In the way that exists here the code is shorter and more connected to each other without having
  // to check which product is in which list.
  get CartList$() {
    return this.PokemonList$.pipe(map((m) => m.filter((f) => f.isOnCart)));
  }

  // Get pokemon's list id/Image from server --- global error handling
  initPokemonsIdAndImage() {
    this.pokemonsSub = this.apiClient.getPokemonsInfo().subscribe((response) => {
      if (response !== undefined) {
        this.pokemonList.next(response);
        this.logger.info(`Got ${response.length} pokemons`);
        this.pokemonsSub.unsubscribe();
      }
    });
  }

  // Option number 2 for getting pokemons list --- not active just for ref
  async initPokemonsIdAndImageAsync() {
    let pokemons = await this.apiClient.getPokemonsInfoAsync();
    this.pokemonList.next(pokemons);
  }
}
