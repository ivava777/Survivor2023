import { Order } from '../interfaces/order.interface';

class Product {
  productId: number = 0;
  qty: number = 0;
  amount: number = 0;

  constructor(data: Product) {
    this.productId = data.productId;
    this.qty = data.qty;
    this.amount = data.amount;
  }
}

export class OrderModel {
  id: string = '';
  amount: number = 0;
  date: Date = new Date();
  status: string = '';
  email: string = '';
  products: Product[] = [];

  constructor(data: Order) {
    if (data) {
      for (const key of Object.keys(data)) {
        if (key === 'products') {
          if (!!data[key]) {
            this.products =
              data[key] && data[key].map((item) => new Product(item));
          } else {
            this.products = [];
          }
        } else if (key === 'date') {
          this.date = new Date(data.date);
        } else {
          // @ts-ignore
          this[key] = data[key];
        }
      }
    }
  }
}
