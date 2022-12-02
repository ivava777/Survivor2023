import { Injectable } from '@angular/core';
import { ProductsApiService } from '../api/products.api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = new BehaviorSubject<ProductModel[]>([]);

  constructor(private productsApiService: ProductsApiService) {}

  public fetchProducts(): void {
    this.productsApiService
      .getProducts()
      .subscribe((products) => this.products.next(products));
  }

  public getProductsObservable(): Observable<ProductModel[]> {
    return this.products.asObservable();
  }
}
