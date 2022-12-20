import { ProductModel } from '../../../core/models/product.model';

export class OrderDetailModel {
  id: string = '';
  amount: number = 0;
  date: Date = new Date();
  status: string = '';
  email: string = '';
  products: ProductModel[] = [];

  constructor(data: {}) {
    if (data) {
      for (const key of Object.keys(data)) {
        // @ts-ignore
        this[key] = data[key];
      }
    }
  }
}
