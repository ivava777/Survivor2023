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

  public getProduct(id: number): ProductModel | null {
    if (!this.products.value.length) {
      this.fetchProducts();
    }
    return this.products.value.find((item) => item.id === id) ?? null;
  }
}
