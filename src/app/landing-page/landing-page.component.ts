import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ze-landing-page',
  templateUrl: './landing-page.component.html',
  styles: []
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate(['/signin']);
      } else {
        this.router.navigate(['/overview']);
      }
    });
  }
}

