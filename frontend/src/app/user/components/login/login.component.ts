import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthApiService } from '../../shared/services/auth-api.service';
import { SkinDataService } from '../../shared/services/skin-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName = '';
  email = '';
  password = '';
  rememberMe = false;

  submitted = false;
  nameTouched = false;
  emailTouched = false;
  passwordTouched = false;

  errorMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthApiService,
    private skinDataService: SkinDataService
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
      this.isValidFullName(this.userName) &&
      this.isValidEmail(this.email) &&
      this.isValidPassword(this.password)
    );
  }

  signIn() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.isFormValid) {
      this.errorMessage = 'Please complete all fields correctly.';
      return;
    }

    this.isLoading = true;

    this.authService.login({
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', String(res.id));
        localStorage.setItem('userName', res.fullName);
        localStorage.setItem('userEmail', res.email);
        localStorage.setItem('userRole', res.role);

        if (this.rememberMe) {
          localStorage.setItem('rememberEmail', res.email);
        }

        if (res.role === 'Admin') {
          this.isLoading = false;
          this.router.navigate(['/admin/dashboard']);
          return;
        }

        this.loadUserLatestAnalysis(res.id);
      },

      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = err?.error || 'Invalid email or password';
      }
    });
  }

  loadUserLatestAnalysis(userId: number): void {
    this.authService.getLatestAnalysisResult(userId).subscribe({
      next: (result) => {
        localStorage.setItem('analysisResult', JSON.stringify(result));

        const analysisData = {
          skinType: result.skinType || '',
          ageGroup: result.ageGroup || '',
          budget: result.budget || '',
          sunExposure: result.sunExposure || '',
          waterLevel: result.waterLevel || '',

          concerns: result.concerns ? result.concerns.split(',') : [],
          habits: result.habits ? result.habits.split(',') : [],
          selectedProducts: result.selectedProducts ? result.selectedProducts.split(',') : [],

          answers: {
            acneNow: result.acneNow || '',
            irritation: result.irritation || '',
            makeup: result.makeup || '',
            allergies: result.allergies || '',
            sleep: result.sleep || '',
            stress: result.stress || '',
            diet: result.diet || ''
          }
        };

        this.skinDataService.setAnalysisData(analysisData);

        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },

      error: () => {
        localStorage.removeItem('analysisResult');
        this.skinDataService.clearAnalysisData();

        this.isLoading = false;
        this.router.navigate(['/analysis']);
      }
    });
  }
}