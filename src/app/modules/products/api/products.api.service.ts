import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  public getProducts(): Observable<ProductModel[]> {
    return of(ProductListMock);
  }
}

const ProductListMock = [
  new ProductModel({
    id: 1,
    title: 'Invertor 12-220',
    price: 3000,
    status: 'available',
    image:
      'data:image/jpeg;base64,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',
  }),
  new ProductModel({
    id: 2,
    title: 'Invertor 12-220 pure sinus',
    price: 6000,
    status: 'available',
    image:
      'data:image/jpeg;base64,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',
  }),
  new ProductModel({
    id: 3,
    title: 'Powerbank 10000 mAh',
    price: 1000,
    status: 'available',
    image:
      'data:image/jpeg;base64,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',
  }),
  new ProductModel({
    id: 4,
    title: 'Powerbank 20000 mAh',
    price: 1500,
    status: 'notAvailable',
    image:
      'data:image/jpeg;base64,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',
  }),
];