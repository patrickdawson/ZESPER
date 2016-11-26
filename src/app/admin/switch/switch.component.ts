import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ze-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit, OnDestroy {
  private isActiveSubscription: Subscription;
  private isActive = false;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.isActiveSubscription = this.orderService.canOrder().subscribe(canSubscribe => this.isActive = canSubscribe);
  }

  ngOnDestroy(): void {
    this.isActiveSubscription.unsubscribe();
  }

  onSwitchChange(val) {
    this.orderService.allowOrders(val);
  }


}
