import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './modules/products/components/products/products.component';
import { CartComponent } from './modules/cart/components/cart/cart.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
