import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../../shared/shared.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  imports: [BrowserModule, SharedModule, MatCardModule, MatIconModule],
  declarations: [CartComponent, CartItemComponent, OrderListComponent, OrderComponent],
  exports: [CartComponent],
})
export class CartModule {}
