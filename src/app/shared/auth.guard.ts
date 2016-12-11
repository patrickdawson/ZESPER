/**
 * Created by Patrick Dawson on 15.10.2016.
 */

import {Injectable} from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.getAuthState().map((isAuth) => {
      if (!isAuth) {
        console.log('Not authenticated!');
        this.router.navigate(['/signin']);
      }
      return !!isAuth;
    }).take(1);
  }
}
