import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../shared';

@Component({
  selector: 'ze-overview-list-item',
  templateUrl: 'overview-list-item.component.html',
  styleUrls: ['overview-list-item.component.css']
})
export class OverviewListItemComponent implements OnInit {
  @Input() order: Order;

  constructor() { }

  ngOnInit() {
  }

}
