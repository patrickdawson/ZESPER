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

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.onAuthStateChanged((user) => {
      if (user) {
        this.authenticated = true;
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
