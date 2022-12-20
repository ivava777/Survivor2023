import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDetailModel } from '../../models/order-detail.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  public id: string = '';
  public order: OrderDetailModel | null = null;
  public displayedColumns = ['product', 'qty', 'amount'];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ?? '';
      if (this.id) {
        this.orderService.getOrder(this.id).subscribe((order) => {
          this.order = order;
          console.log(order);
        });
      }
    });
  }
}
