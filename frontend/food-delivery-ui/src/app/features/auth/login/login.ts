import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/AuthService/auth';
import { TokenStorage } from '../../../core/services/TokenStorageService/token-storage';
import { Router } from '@angular/router';
import { ICONS } from '../../../constants/icons';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(Auth);
  private tokenStorage = inject(TokenStorage);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  @Output() isRegisterButtonClicked = new EventEmitter<boolean>();
  readonly icons = ICONS;
  isLoginFailed = false;
  isLoading = false;

  /**
 * Controls whether the password is displayed as plain text.
 */
  showPassword = false;
  
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  /**
 * Toggles the password visibility between hidden and visible states.
 */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isButtonDisabled(): boolean {
    const {email , password} = this.loginForm.getRawValue();
    if(email && password && this.loginForm.valid && !this.isLoading) {
       return false;
    }
    return true;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.isLoginFailed = true;
      return;
    }
    
    this.isLoading = true;
    // Disable all form controls while the login request is in progress.
    this.loginForm.disable();
    const { email, password } = this.loginForm.getRawValue();
    console.log('Email:', JSON.stringify(email));
    console.log('Password:', JSON.stringify(password));

    this.authService.login({
      email: email!,
      password: password!
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Re-enable the form controls when loading finishes.
        this.loginForm.enable();
        if(!response.token){
          this.isLoginFailed = true;
          this.cdr.detectChanges();
          console.log("is login failed: ",this.isLoginFailed);
          return;
        }
        console.log('Login successful:', response);
        this.tokenStorage.setToken(response.token);
        const role = this.tokenStorage.getRole();

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.isLoginFailed= true;
        // Re-enable the form controls when loading finishes.
        this.loginForm.enable();
        this.cdr.detectChanges();
        console.error('Login failed:', error);
      }
    });
  }

  registerButtonClicked(): void {
      this.isRegisterButtonClicked.emit(true);
  }
}
