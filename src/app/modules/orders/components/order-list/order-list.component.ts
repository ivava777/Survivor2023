import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../models/orderModel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  public orders: OrderModel[] = [];
  public displayedColumns = ['position', 'date', 'amount', 'status'];

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (value) =>
        (this.orders = value.map((item, index) => ({
          ...item,
          position: index + 1,
        })))
    );
  }

  openOrder(id: string): void {
    this.router.navigate([`orders/${id}`]);
  }
}
