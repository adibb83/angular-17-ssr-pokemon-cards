import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartComponent } from '../../pages/cart/cart.component';
import { AuthService } from '../../services/auth-service/auth.service';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
