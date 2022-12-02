import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../../../core/models/product.model';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: ProductModel[] = [];

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getProductsObservable().subscribe((products) => {
      this.products = products;
    });
    this.productsService.fetchProducts();
  }

  addToCart(id: number): void {
    this.cartService.addProduct(this.products.find((item) => item.id === id));
  }
}
