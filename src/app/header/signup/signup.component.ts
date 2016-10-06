import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ze-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private signupForm: FormGroup;
  private error: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    // noinspection TsLint
    this.signupForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`)
      ]],
      'password': ['', Validators.required]
    });
  }

  signup() {
    const email = this.signupForm.controls['email'].value;
    const password = this.signupForm.controls['password'].value;
    this.authService.signup(email, password)
      .then(() => this.error = null)
      .catch(error => {
        this.error = error;
      });
  }

}
