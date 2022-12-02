import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
  ],
  declarations: [ProductsComponent, ProductComponent],
  exports: [ProductsComponent],
})
export class ProductsModule {}
