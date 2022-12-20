import { Injectable } from '@angular/core';
import { OrdersApiService } from '../../orders/api/orders-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CartProductItem } from '../../cart/interfaces/cart-product-item.interface';
import { map, Observable } from 'rxjs';
import { OrderModel } from '../models/orderModel.model';
import { OrderDetailModel } from '../models/order-detail.model';
import { ProductsService } from '../../products/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private ordersApiService: OrdersApiService,
    private productService: ProductsService,
    private readonly authService: AuthService
  ) {}

  createOrder(
    items: CartProductItem[],
    amount: number,
    email?: string
  ): Promise<any> | undefined {
    const currentEmail = !!email ? email : this.authService.getCurrentEmail();
    if (!currentEmail) {
      return;
    }
    return this.ordersApiService.createOrder({
      id: '',
      date: new Date().getTime(),
      email: currentEmail,
      amount,
      status: 'new',
      products: items.map((item) => ({
        productId: item.item.id,
        amount: item.amount,
        qty: item.qty,
      })),
    });
  }

  getOrders(): Observable<OrderModel[]> {
    return this.ordersApiService
      .getMyOrders()
      .pipe(map((orders) => orders.map((order) => new OrderModel(order))));
  }

  getOrder(id: string): Observable<OrderDetailModel | null> {
    return this.ordersApiService.getOrder(id).pipe(
      map((order) => (order ? new OrderModel(order) : null)),
      map((order) => {
        const products = order?.products.map((product) => ({
          ...product,
          product: this.productService.getProduct(product.productId),
        }));
        return new OrderDetailModel({
          ...order,
          products,
        });
      })
    );
  }
}
