import { ProductModel } from '../../../core/models/product.model';

export interface CartProductItem {
  item: ProductModel;
  qty: number;
  amount: number;
}
