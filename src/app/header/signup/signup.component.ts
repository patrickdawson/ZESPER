import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ze-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  private signupForm: FormGroup;
  private error: string;
  private success: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    // noinspection TsLint
    this.signupForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`)
      ]],
      'passwords': this.formBuilder.group({
        'password': ['', Validators.required],
        'password2': ['', Validators.required]
      }, {validator: this.passwordEqualValidator})
    });

    this.error = null;
    this.success = false;
  }

  signup() {
    const email = this.signupForm.controls['email'].value;
    const password = (this.signupForm.controls['passwords'] as FormGroup).controls['password'].value;
    this.authService.signup(email, password)
      .then(() => {
        this.error = null;
        this.success = true;
      })
      .catch(error => {
        this.success = null;
        this.error = error;
      });
  }

  onChange() {
    this.error = null;
  }

  passwordEqualValidator(formGroup: FormGroup): any {
    const pass1 = formGroup.controls['password'].value as string;
    const pass2 = formGroup.controls['password2'].value as string;
    if (pass1 !== '') {
      if (pass2 !== '') {
        if (pass1 !== pass2) {
          return {notIdentical: true};
        }
      } else {
        return {notConfirmed: true};
      }
    }

    return null;
  }

}
