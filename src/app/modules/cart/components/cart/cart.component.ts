import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { CartProductItem } from '../../interfaces/cart-product-item.interface';
import { CartTotal } from '../../interfaces/cart-total.interface';
import { Router } from '@angular/router';
import { ProductModel } from '../../../../core/models/product.model';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cartProducts: CartProductItem[] = [];
  public cartTotal: CartTotal = { amount: 0, qty: 0 };
  public status: string = '';

  private unsubscriber = new Subject<boolean>();

  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cartService
      .getCartProducts$()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((res) => (this.cartProducts = res));

    this.cartService
      .getCartTotals$()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((res) => (this.cartTotal = res));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(false);
    this.unsubscriber.complete();
  }

  public goToProducts(): void {
    this.router.navigate(['products']);
  }

  increaseHandler(product: ProductModel) {
    this.cartService.addProduct(product);
  }

  decreaseHandler(product: ProductModel) {
    this.cartService.deleteProduct(product);
  }

  isCreationOrderDisabled(): boolean {
    return this.cartTotal.amount === 0;
  }

  createOrder() {
    this.orderService
      .createOrder(this.cartService.cartProducts.value, this.cartTotal.amount)
      ?.then((res) => {
        this.status = 'Order created!';
        this.cartService.clearAll();
      });
  }
}
