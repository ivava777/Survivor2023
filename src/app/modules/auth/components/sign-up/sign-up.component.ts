import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { convertMessage } from '../../utils/auth-error-handler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  form: FormGroup;
  hidePassword = true;
  hideRepeatPassword = true;
  submitted = false;
  signUpError = '';

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
          Validators.pattern('^[A-Za-z0-9]+$'),
        ],
      ],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
          this.matchPassword,
        ],
      ],
    });
  }

  public submitForm(value: any): void {
    this.authService.signUp(value.email, value.password).catch((error) => {
      this.signUpError = convertMessage(error);
    });
  }

  matchPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = this.form?.get('password')?.value;
    let confirmPass = group?.value;
    return !pass || pass === confirmPass ? null : { notSame: true };
  };

  getErrorMessage(formControlName: string): string {
    const formControl = this.form.get(formControlName);
    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    } else if (formControl?.hasError('email')) {
      return 'Email is not valid';
    } else if (formControl?.hasError('minlength')) {
      return 'Should be more than 3 characters';
    } else if (formControl?.hasError('maxlength')) {
      return 'Should be less than 25 characters';
    } else if (formControl?.hasError('notSame')) {
      return 'Password not matched';
    } else if (formControl?.hasError('pattern')) {
      return 'Password should contain latin or numbers';
    }
    return '';
  }
}
