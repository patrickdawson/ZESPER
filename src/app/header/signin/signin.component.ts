import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ze-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {
  private error: string;
  private signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    // noinspection TsLint
    this.signinForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`)
      ]],
      'password': ['', Validators.required]
    });

    this.error = null;
  }

  signin() {
    const email = this.signinForm.controls['email'].value;
    const password = this.signinForm.controls['password'].value;
    this.authService.signin(email, password)
      .then(() => this.router.navigate(['/overview']))
      .catch(error => {
        this.error = error;
      });
  }

}
