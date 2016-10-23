/**
 * Created by Patrick Dawson on 16.10.2016.
 */

import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if ((<any>route.params).customer === this.authService.getCurrentUserEmail()) {
      return true;
    } else {
      console.log(`Access to ${state.url} not allowed`);
    }
  }
}
