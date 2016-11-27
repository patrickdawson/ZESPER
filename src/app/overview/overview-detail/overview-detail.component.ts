import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ze-overview-detail',
  templateUrl: 'overview-detail.component.html',
  styleUrls: ['overview-detail.component.css']
})
export class OverviewDetailComponent implements OnInit, OnDestroy {
  private subscription;
  private order: Order;
  private customer: string;
  //private orderSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
      this.customer = params['customer'];
      /*this.orderSubscription = */
      this.orderService.getByCustomer(this.customer).then(order => {
        this.order = order;

        if (!this.order) {
          this.router.navigate(['/overview']);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.orderSubscription.unsubscribe();
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.customer);
    this.router.navigate(['/overview']);
  }

}
