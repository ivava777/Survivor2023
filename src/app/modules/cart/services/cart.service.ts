import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../../../core/models/product.model';
import { CartProductItem } from '../interfaces/cart-product-item.interface';
import { CartTotal } from '../interfaces/cart-total.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts = new BehaviorSubject<CartProductItem[]>([]);
  cartTotal = new BehaviorSubject<CartTotal>({ amount: 0, qty: 0 });

  constructor() {}

  public getCartProducts$(): Observable<CartProductItem[]> {
    return this.cartProducts.asObservable();
  }

  public getCartTotals$(): Observable<CartTotal> {
    return this.cartTotal.asObservable();
  }

  public addProduct(product: ProductModel | undefined): void {
    if (!product) {
      return;
    }
    const cartItem = this.cartProducts.value.find(
      (item) => item.item.id === product.id
    );
    if (!cartItem) {
      this.cartProducts.next([
        ...this.cartProducts.value,
        { item: product, qty: 1, amount: product.price * 1 },
      ]);
    } else {
      this.cartProducts.next(
        this.cartProducts.value.map((item) => {
          if (item.item.id === product.id) {
            return {
              ...item,
              qty: item.qty + 1,
              amount: item.item.price * (item.qty + 1),
            };
          } else {
            return item;
          }
        })
      );
    }
    this.recalcTotals();
  }

  public deleteProduct(product: ProductModel): void {
    const cartItem = this.cartProducts.value.find(
      (item) => item.item.id === product.id
    );
    if (!cartItem) {
      return;
    }
    if (cartItem.qty > 1) {
      this.cartProducts.next(
        this.cartProducts.value.map((item) => {
          if (item.item.id === product.id) {
            return {
              ...item,
              qty: item.qty - 1,
              amount: item.item.price * (item.qty - 1),
            };
          } else {
            return item;
          }
        })
      );
    } else {
      this.cartProducts.next(
        this.cartProducts.value.filter((item) => item.item.id !== product.id)
      );
    }
    this.recalcTotals();
  }

  private recalcTotals(): void {
    let amount = 0,
      qty = 0;
    this.cartProducts.value.forEach((item) => {
      amount += item.amount;
      qty += item.qty;
    });
    this.cartTotal.next({ amount, qty });
  }
}
