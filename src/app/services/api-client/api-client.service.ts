import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import { Pokemon, PokemonsResponse } from '../../models/pokemon-types';

const environment: any = {
  pokNamesUrl: 'https://pokeapi.co/api/v2/pokemon?limit=',
  pokImgUrl: 'https://pokeapi.co/api/v2/pokemon/',
}

@Injectable({
  providedIn: 'root',
})

export class ApiClientService {
  private maxItems = 50;

  constructor(
    private logger: LoggerService,
    private httpClient: HttpClient) { }

  // Get pokemon's names
  getPokemons(): Observable<PokemonsResponse> {
    this.logger.info('fetching pokemons');
    return this.httpClient.get<PokemonsResponse>(`${environment.pokNamesUrl}${this.maxItems}`);
  }

  // Convert pokemon names to pokemon data by name and create new list
  getPokemonsInfo(): Observable<Pokemon[]> {
    this.logger.info('fetching pokemons ids/images');
    return this.getPokemons().pipe(
      concatMap((pokList) => {
        return forkJoin(
          pokList.results.map((pok) =>
            this.httpClient.get<any>(`${environment.pokImgUrl}${pok.name}`)
          )
        ).pipe(
          map((recordsArrays) =>
            recordsArrays.reduce(
              (arr, r) =>
                arr.concat({
                  id: r['id'],
                  name: r['name'],
                  imgUrl: r['sprites']['front_default'],
                  power: r['base_experience'],
                  isOnCart: false,
                } as Pokemon),
              []
            )
          )
        );
      })
    );

  }


  // Option number 2 for getting pokemon's data list
  async getPokemonsInfoAsync(): Promise<Pokemon[]> {
    const response = await lastValueFrom(this.getPokemons())
    this.logger.info(JSON.stringify(response.results));
    let promises: any[] = [];

    response.results.forEach(pok => {
      promises.push(lastValueFrom(this.httpClient.get<any>(`${environment.pokImgUrl}${pok.name}`)));
    });

    const pokemons = (await Promise.all(promises)).map(r => {
      return {
        id: r['id'],
        name: r['name'],
        imgUrl: r['sprites']['front_default'],
        power: r['base_experience'],
        isOnCart: false,
      } as Pokemon;
    });

    return pokemons;
  }
}
