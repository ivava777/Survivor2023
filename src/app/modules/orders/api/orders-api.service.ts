import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order.interface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService {
  private basePath = 'orders';

  constructor(private db: AngularFireDatabase) {}

  private getUid(email: string, date: number): string {
    return email + '-' + date.toString();
  }

  public createOrder(order: Order): Promise<void> {
    const newRef = this.db.list(this.basePath).push(order);
    const key = newRef.key;
    if (key) {
      return this.db.list(this.basePath).update(key, { order, id: key });
    } else {
      return new Promise((res, rej) => rej());
    }
  }

  public getOrder(id: string): Observable<Order | null> {
    return this.db
      .object<Order | null>(`${this.basePath}/${id}`)
      .valueChanges();
  }

  public getMyOrders(): Observable<Order[]> {
    return this.db.list<any>(this.basePath).valueChanges();
  }
}
