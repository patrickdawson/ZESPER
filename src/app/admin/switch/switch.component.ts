import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'ze-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  private isActive = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.areOrdersAllowed().then(allowed => this.isActive = allowed);
  }

  onSwitchChange(val) {
    this.orderService.allowOrders(val);
  }


}
