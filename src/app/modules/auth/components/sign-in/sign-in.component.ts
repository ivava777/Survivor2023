import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertMessage } from '../../utils/auth-error-handler';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  submitted = false;
  loginError = '';

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(4)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
        ],
      ],
    });
  }

  ngOnInit() {}

  public submitForm(value: any): void {
    this.loginError = '';
    this.submitted = true;
    this.authService.signIn(value.email, value.password).catch((error) => {
      this.loginError = convertMessage(error);
    });
  }

  getErrorMessage(formControlName: string): string {
    if (this.form.get(formControlName)?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
}
