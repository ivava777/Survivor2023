import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OrderListComponent } from './components/order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  imports: [
    //AngularMaterialModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  declarations: [OrderListComponent, OrderComponent],
  exports: [OrderListComponent, MatTableModule],
})
export class OrdersModule {}
