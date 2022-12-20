interface Product {
  productId: number;
  qty: number;
  amount: number;
}

export interface Order {
  id: string;
  amount: number;
  date: number;
  status: string;
  email: string;
  products: Product[];
}
