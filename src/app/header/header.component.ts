import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ze-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authenticated: boolean = false;
  private isAdmin: boolean = false;

  constructor(private authService: AuthService,
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
  }

  signout() {
    this.authService.signout().then(() => {
      console.log('Successfully signed out');
      this.router.navigate(['/overview']);
    });

  }

}
