import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokListComponent } from '../../components/pok-list/pok-list.component';
import { PokCardComponent } from '../../components/pok-card/pok-card.component';
import { MaterialModule } from '../material-module/material.module';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { AuthService } from '../../services/auth-service/auth.service';


const SHARED_COMPONENTS = [PokListComponent, PokCardComponent];
const SHARED_MODULES = [MaterialModule];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [CommonModule, SHARED_MODULES],
  exports: [SHARED_COMPONENTS, SHARED_MODULES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [PokemonService, AuthService],
    };
  }
}
