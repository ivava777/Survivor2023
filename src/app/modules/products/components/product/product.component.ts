import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductStatus } from '../../../../core/enums/product.status.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() id: number | undefined;
  @Input() title: string | undefined;
  @Input() price: number | undefined;
  @Input() image: string | undefined;
  @Input() status: ProductStatus | null = null;

  @Output()
  addToCartEvent = new EventEmitter<number>();

  ProductStatus = ProductStatus;

  public addToCart() {
    this.addToCartEvent.emit(this.id);
  }
}
