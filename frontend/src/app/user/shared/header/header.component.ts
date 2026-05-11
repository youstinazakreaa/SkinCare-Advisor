import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck {
  isLoggedIn = false;
  userName = '';
  userRole = '';

  constructor(private router: Router) {}

  ngDoCheck(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.userName = localStorage.getItem('userName') || '';
    this.userRole = localStorage.getItem('userRole') || '';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('analysisResult');
    localStorage.removeItem('skinAnalysisData');
    localStorage.removeItem('routineSteps');

    this.router.navigate(['/login']);
  }
}