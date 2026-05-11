import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  SkinAnalysisData,
  SkinDataService
} from '../../shared/services/skin-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName = 'User';
  analysis: SkinAnalysisData | null = null;

  stats: { title: string; value: string; text: string }[] = [];
  tips: string[] = [];

  constructor(
    private skinDataService: SkinDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'User';
    this.analysis = this.skinDataService.getAnalysisData();

    if (!this.analysis) {
      this.stats = [
        { title: 'Skin Analysis', value: 'Not completed', text: 'Start analysis first.' },
        { title: 'Routine', value: 'Locked', text: 'Routine appears after analysis.' },
        { title: 'Products', value: 'Locked', text: 'Products appear after analysis.' }
      ];

      this.tips = ['Complete your skin analysis to unlock your dashboard.'];
      return;
    }

    this.buildDashboard();
  }

  buildDashboard(): void {
    if (!this.analysis) return;

    this.stats = [
      {
        title: 'Skin Type',
        value: this.analysis.skinType,
        text: 'Based on your answers.'
      },
      {
        title: 'Main Goal',
        value: this.getGoal(),
        text: 'Your routine focuses on this.'
      },
      {
        title: 'Budget',
        value: this.analysis.budget,
        text: 'Products match this budget.'
      },
      {
        title: 'Consistency',
        value: this.getConsistency(),
        text: 'Based on habits and lifestyle.'
      }
    ];

    this.tips = this.getTips();
  }

  getGoal(): string {
    if (!this.analysis) return 'Balanced Skin';

    if (this.analysis.concerns.includes('Acne')) return 'Clear + Balance';
    if (this.analysis.concerns.includes('Dark Spots')) return 'Glow + Even Tone';
    if (this.analysis.concerns.includes('Dryness')) return 'Hydration + Repair';
    if (this.analysis.concerns.includes('Wrinkles')) return 'Smooth + Renew';

    return 'Healthy Balance';
  }

  getConsistency(): string {
    if (!this.analysis) return 'Needs analysis';

    let score = 0;

    if (this.analysis.habits.includes('Use skincare daily')) score++;
    if (this.analysis.habits.includes('Wear sunscreen')) score++;
    if (this.analysis.answers.sleep === 'Yes') score++;
    if (this.analysis.answers.stress === 'No') score++;
    if (this.analysis.answers.diet === 'Yes') score++;

    if (score >= 4) return 'Strong';
    if (score >= 2) return 'Medium';
    return 'Needs improvement';
  }

  getTips(): string[] {
    if (!this.analysis) return [];

    const result = [
      'Use sunscreen every morning.',
      'Introduce active ingredients slowly.'
    ];

    if (this.analysis.concerns.includes('Acne')) {
      result.push('Avoid changing too many products at once.');
    }

    if (this.analysis.concerns.includes('Dark Spots')) {
      result.push('Dark spots need consistency and daily SPF.');
    }

    if (this.analysis.answers.irritation === 'Yes') {
      result.push('Focus on barrier repair before strong actives.');
    }

    return result;
  }

  goToAnalysis(): void {
    this.router.navigate(['/analysis']);
  }

  goToRoutine(): void {
    this.router.navigate(['/routine']);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.skinDataService.clearAnalysisData();
    this.router.navigate(['/login']);
  }
}