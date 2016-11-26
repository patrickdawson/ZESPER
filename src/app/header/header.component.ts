import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'ze-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authenticated: boolean = false;
  private isAdmin: boolean = false;
  private areOrdersAllowed = false;
  private subscription;

  constructor(private authService: AuthService,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.onAuthStateChanged((user) => {
      if (user) {
        this.authenticated = true;
        // Check if the user is an admin
        this.authService.isAdmin(user).then(result => {
          this.isAdmin = result;
        });
      } else {
        this.authenticated = false;
      }
    });

    this.subscription = this.orderService.canOrder().subscribe(state => this.areOrdersAllowed = state);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signout() {
    this.authService.signout().then(() => {
      console.log('Successfully signed out');
      this.router.navigate(['/overview']);
    });

  }

}
