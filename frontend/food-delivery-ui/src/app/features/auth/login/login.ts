import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { TokenStorage } from '../../../core/services/token-storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(Auth);
  private tokenStorage = inject(TokenStorage);
  private router = inject(Router);
  
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit(): void {
  if (this.loginForm.invalid) {
    return;
  }

  const { email, password } = this.loginForm.getRawValue();

  console.log('Email:', JSON.stringify(email));
  console.log('Password:', JSON.stringify(password));

  this.authService.login({
    email: email!,
    password: password!
  }).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      this.tokenStorage.setToken(response.token);
      this.router.navigate(['/dashboard']);
    },
    error: (error) => {
      console.error('Login failed:', error);
    }
  });
}
}
