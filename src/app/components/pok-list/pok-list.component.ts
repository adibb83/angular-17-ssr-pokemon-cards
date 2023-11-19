import { Component, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pok-list',
  templateUrl: './pok-list.component.html',
  styleUrls: ['./pok-list.component.scss'],
})

// This list of cards component was created for more reusable code
// Like If we want to filter data for every list. add title, genre ....
export class PokListComponent {
  @Input() pokemons$!: Observable<Pokemon[]>;
  @Input() enableAnimation = false;
  constructor(private pokemonService: PokemonService) { }

  // card event emitter on add/remove card from cart
  updateCard() {
    this.pokemonService.updateCart.next(true);
  }
}
