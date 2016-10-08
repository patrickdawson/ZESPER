import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ze-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  signout() {
    this.authService.signout().then(() => {
      console.log('Successfully signed out');
      this.router.navigate(['/overview']);
    });

  }

}
