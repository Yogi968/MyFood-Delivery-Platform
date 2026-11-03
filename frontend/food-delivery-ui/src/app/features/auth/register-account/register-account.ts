import { ChangeDetectorRef, Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/AuthService/auth';
import { TokenStorage } from '../../../core/services/TokenStorageService/token-storage';
import { Router } from '@angular/router';
import { ICONS } from '../../../constants/icons';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { register, registerFailure, registerSuccess } from '../../../store/actions/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { passwordMatchValidator } from '../../../utils/custom-form-validators.utils';

@Component({
  selector: 'app-register-account',
  imports: [ MatIconModule ,ReactiveFormsModule],
  templateUrl: './register-account.html',
  styleUrl: './register-account.scss',
})
export class RegisterAccount {
  private actions$ = inject(Actions);
  private authService = inject(Auth);
  private readonly store = inject(Store);
  private tokenStorage = inject(TokenStorage);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(NonNullableFormBuilder);
  readonly icons = ICONS;
  isLoading = false;
  message ='';
  error = false;
  success = false;
  displayMessage = false;
  @Output() isLogInClicked = new EventEmitter<boolean>();

  /**
 * Controls whether the password is displayed as plain text.
 */
  showPassword = false;
  registerationForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator(),
    }
  );

  /**
 * Toggles the password visibility between hidden and visible states.
 */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isButtonDisabled(): boolean {
    const {firstName , lastName , email , password , confirmPassword } = this.registerationForm.getRawValue();
    if(firstName && lastName && email && password && confirmPassword && this.registerationForm.valid && !this.isLoading) {
       return false;
    }
    return true;
  }

  onSubmit(): void {
    // if (this.registerationForm.invalid) {
    //   this.isLoginFailed = true;
    //   return;
    // }
    
    this.isLoading = true;
    // Disable all form controls while the login request is in progress.
    this.registerationForm.disable();
    const { firstName,lastName,email, password,confirmPassword } = this.registerationForm.getRawValue();
    console.log('Email:', JSON.stringify(email));
    console.log('Password:', JSON.stringify(password));
    this.store.dispatch(register({firstName,lastName,email, password, confirmPassword}))
    this.listenRegistrationSuccess();
    this.listenRegistrationFailure();
  }

  listenRegistrationSuccess(): void {
    this.actions$
      .pipe(ofType(registerSuccess))
      .subscribe((response) => {
          this.displayMessage = true;
          this.message = response.message; 
          this.success = true;
          this.isLoading = false;
          this.cdr.detectChanges();
      })
  }

  listenRegistrationFailure(): void {
    this.actions$
      .pipe(ofType(registerFailure))
      .subscribe((response) => {
          this.displayMessage = true;
          this.error = true;
          this.message = response.error; 
          this.isLoading = false;
          this.registerationForm.enable();
          this.cdr.detectChanges();
      })
  }

  logInButtonClicked(): void {
      this.isLogInClicked.emit(true);
  }
}
