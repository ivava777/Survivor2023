import { ProductStatus } from '../enums/product.status.enum';

export class ProductModel {
  constructor(param: {
    price: number;
    id: number;
    title: string;
    image?: string;
    status: string;
  }) {
    this.id = param.id;
    this.title = param.title;
    this.price = param.price;
    this.image = param.image;
    // @ts-ignore
    this.status = ProductStatus[param.status];
  }

  id: number = 0;
  title: string = '';
  price: number = 0;
  image?: string = '';
  status: ProductStatus | null = null;
}
