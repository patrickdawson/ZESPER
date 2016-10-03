import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared';

@Component({
  selector: 'ze-overview-list',
  templateUrl: 'overview-list.component.html',
  styleUrls: ['overview-list.component.css']
})
export class OverviewListComponent implements OnInit {
  private orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders = this.orderService.getAllOrders();
    this.orderService.ordersChanged.subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

}
