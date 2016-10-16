import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared';

@Component({
  selector: 'ze-overview-list',
  templateUrl: 'overview-list.component.html',
  styleUrls: ['overview-list.component.css']
})
export class OverviewListComponent implements OnInit, OnDestroy {
  private orders: Order[] = [];
  private subscription;

  constructor(private orderService: OrderService) {
  }

  /*set orders(value) {
    this._orders = value;
  }

  get orders() {
    return this._orders;
  }*/

  ngOnInit() {
    this.orders = this.orderService.getAllOrders();
    this.subscription = this.orderService.ordersChanged.subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
