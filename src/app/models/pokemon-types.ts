export class PokemonsResponse {
  results!: Pokemon[];
}

export class Pokemon {
  id?: number;
  name!: string;
  power?: number;
  imgUrl?: string;
  isOnCart = false;
}
