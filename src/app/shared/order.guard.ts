/**
 * Created by Patrick Dawson on 21.11.2016.
 */

import { Injectable, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrderGuard implements CanActivate {
  constructor(private router: Router, private orderService: OrderService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.orderService.canOrder(true).do(canOrder => {
      if (!canOrder) {
        this.router.navigate(['closed']);
      }
    });
  }
}
