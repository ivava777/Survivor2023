import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductItem } from '../../interfaces/cart-product-item.interface';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input()
  public cartItem: CartProductItem | null = null;
  @Output()
  public increaseEvent = new EventEmitter<ProductModel>();
  @Output()
  public decreaseEvent = new EventEmitter<ProductModel>();

  constructor() {}

  ngOnInit(): void {}

  decrease() {
    this.decreaseEvent.emit(this.cartItem?.item);
  }

  increase() {
    this.increaseEvent.emit(this.cartItem?.item);
  }
}
