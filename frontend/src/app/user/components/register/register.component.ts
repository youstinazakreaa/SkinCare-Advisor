import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthApiService } from '../../shared/services/auth-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  submitted = false;

  nameTouched = false;
  emailTouched = false;
  passwordTouched = false;
  confirmPasswordTouched = false;

  errorMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthApiService
  ) {}

  isValidFullName(name: string): boolean {
    const cleanedName = name.trim().replace(/\s+/g, ' ');

    if (cleanedName.length < 3) return false;
    if (/\d/.test(cleanedName)) return false;

    const parts = cleanedName.split(' ');
    return parts.length >= 2;
  }

  isValidEmail(email: string): boolean {
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(trimmedEmail);
  }

  isValidPassword(password: string): boolean {
    return password.trim().length >= 8;
  }

  get isFormValid(): boolean {
    return !!(
      this.isValidFullName(this.fullName) &&
      this.isValidEmail(this.email) &&
      this.isValidPassword(this.password) &&
      this.confirmPassword.trim() &&
      this.password === this.confirmPassword
    );
  }

  createAccount() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.isFormValid) {
      return;
    }

    this.isLoading = true;

    this.authService.register({
      fullName: this.fullName.trim(),
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: (res) => {

        localStorage.setItem('isLoggedIn', 'true');

        localStorage.setItem('userId', String(res.id));
        localStorage.setItem('userName', res.fullName);
        localStorage.setItem('userEmail', res.email);
        localStorage.setItem('userRole', res.role);

        this.isLoading = false;

        this.router.navigate(['/analysis']);
      },

      error: (err) => {
        console.error(err);

        this.isLoading = false;

        this.errorMessage =
          err?.error || 'Registration failed';
      }
    });
  }
}