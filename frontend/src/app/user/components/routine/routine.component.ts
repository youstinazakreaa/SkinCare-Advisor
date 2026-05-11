import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  SkinAnalysisData,
  SkinDataService
} from '../../shared/services/skin-data.service';

interface RoutineStep {
  step: string;
  title: string;
  type: string;
  description: string;
}

interface SummaryItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent implements OnInit {
  analysis: SkinAnalysisData | null = null;

  morningRoutine: RoutineStep[] = [];
  nightRoutine: RoutineStep[] = [];
  profileSummary: SummaryItem[] = [];
  helpfulTips: string[] = [];
  aiNotes: string[] = [];

  focusCard = '';
  showBlockedMessage = false;

  constructor(
    private skinDataService: SkinDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = this.skinDataService.getAnalysisData();
    const savedResult = localStorage.getItem('analysisResult');

    if (!data || !savedResult) {
      this.showBlockedMessage = true;

      setTimeout(() => {
        this.router.navigate(['/analysis']);
      }, 2000);

      return;
    }

    const result = JSON.parse(savedResult);

    this.analysis = data;
    this.helpfulTips = result.tips || [];

    const morningProducts = result.morningRoutine || [];
    const nightProducts = result.nightRoutine || [];

    const morningUniqueSteps = [
      ...new Set(morningProducts.map((product: any) => product.matchesStep))
    ];

    const nightUniqueSteps = [
      ...new Set(nightProducts.map((product: any) => product.matchesStep))
    ];

    this.morningRoutine = morningUniqueSteps.map((step, index) =>
      this.createRoutineStep(step as string, index)
    );

    this.nightRoutine = nightUniqueSteps.map((step, index) =>
      this.createRoutineStep(step as string, index)
    );

    this.generateSummary();
    this.aiNotes = this.generateAiNotes();
  }

  createRoutineStep(stepName: string, index: number): RoutineStep {
    return {
      step: String(index + 1).padStart(2, '0'),
      title: this.getStepTitle(stepName),
      type: this.getStepType(stepName),
      description: this.getStepDescription(stepName)
    };
  }

  getStepTitle(step: string): string {
    const titles: Record<string, string> = {
      'Cleanser': 'Gentle Cleanser',
      'Vitamin C': 'Vitamin C Serum',
      'Niacinamide': 'Niacinamide Serum',
      'Hydrating Serum': 'Hydrating Serum',
      'Moisturizer': 'Moisturizer',
      'Sunscreen': 'SPF 50 Sunscreen',
      'Acne Treatment': 'Acne Treatment',
      'AHA/BHA': 'AHA/BHA Exfoliant',
      'Retinol': 'Retinol Serum',
      'Barrier Repair': 'Barrier Repair Cream'
    };

    return titles[step] || step;
  }

  getStepType(step: string): string {
    const types: Record<string, string> = {
      'Cleanser': 'Cleanser',
      'Vitamin C': 'Serum',
      'Niacinamide': 'Serum',
      'Hydrating Serum': 'Serum',
      'Moisturizer': 'Moisturizer',
      'Sunscreen': 'Protection',
      'Acne Treatment': 'Treatment',
      'AHA/BHA': 'Exfoliant',
      'Retinol': 'Treatment',
      'Barrier Repair': 'Repair'
    };

    return types[step] || 'Treatment';
  }

  getStepDescription(step: string): string {
    const descriptions: Record<string, string> = {
      'Cleanser': 'Start with a gentle cleanser to remove oil, sweat and impurities without damaging the skin barrier.',
      'Vitamin C': 'Helps brighten dark spots, improve uneven tone and support a healthy glow.',
      'Niacinamide': 'Helps control excess oil, reduce the look of pores and support acne-prone skin.',
      'Hydrating Serum': 'Adds lightweight hydration and helps keep the skin plump and comfortable.',
      'Moisturizer': 'Locks in hydration and supports the skin barrier.',
      'Sunscreen': 'Protects the skin from UV damage and helps prevent pigmentation and aging signs.',
      'Acne Treatment': 'Targets active breakouts and helps reduce blemishes.',
      'AHA/BHA': 'Helps improve texture, clogged pores and dullness. Use slowly and avoid over-exfoliation.',
      'Retinol': 'Supports skin renewal and improves texture and fine lines. Best used at night.',
      'Barrier Repair': 'Calms dryness or irritation and helps rebuild the skin barrier.'
    };

    return descriptions[step] || 'Supports your personalized skincare routine.';
  }

  generateSummary(): void {
    if (!this.analysis) return;

    this.profileSummary = [
      { label: 'Skin Type', value: this.analysis.skinType },
      { label: 'Main Goal', value: this.getGoal() },
      { label: 'Budget', value: this.analysis.budget },
      { label: 'Routine Level', value: this.getRoutineLevel() }
    ];

    this.focusCard = this.getFocusCard();
  }

  generateAiNotes(): string[] {
    if (!this.analysis) return [];

    const notes: string[] = [];

    if (this.analysis.skinType === 'Oily') {
      notes.push('Niacinamide was selected to help balance oil production and support pores.');
    }

    if (this.analysis.skinType === 'Dry') {
      notes.push('Hydrating and barrier-supporting steps were added because your skin profile shows dryness.');
    }

    if (this.analysis.skinType === 'Sensitive' || this.analysis.answers.irritation === 'Yes') {
      notes.push('The routine focuses on barrier repair because you reported sensitivity or irritation.');
    }

    if (this.analysis.concerns.includes('Acne') || this.analysis.answers.acneNow === 'Yes') {
      notes.push('An acne treatment step was added because acne was selected as a concern.');
    }

    if (this.analysis.concerns.includes('Dark Spots')) {
      notes.push('Vitamin C and daily sunscreen support brighter skin and help reduce dark spots.');
    }

    if (this.analysis.sunExposure === 'High') {
      notes.push('Sunscreen is prioritized because your sun exposure level is high.');
    }

    notes.push(`Products are matched with your selected budget: ${this.analysis.budget}.`);

    return notes;
  }

  getGoal(): string {
    if (!this.analysis) return 'Balanced Skin';

    if (this.analysis.concerns.includes('Acne')) return 'Clear + Balanced Skin';
    if (this.analysis.concerns.includes('Dark Spots')) return 'Glow + Even Tone';
    if (this.analysis.concerns.includes('Dryness')) return 'Hydration + Repair';
    if (this.analysis.concerns.includes('Wrinkles')) return 'Smooth + Renewed Skin';

    return 'Healthy Balanced Skin';
  }

  getRoutineLevel(): string {
    const steps = [
      ...this.morningRoutine.map(x => x.title),
      ...this.nightRoutine.map(x => x.title)
    ];

    const hasActive = steps.some(step =>
      step.includes('Retinol') ||
      step.includes('AHA/BHA') ||
      step.includes('Acne Treatment') ||
      step.includes('Vitamin C') ||
      step.includes('Niacinamide')
    );

    return hasActive ? 'Intermediate' : 'Beginner friendly';
  }

  getFocusCard(): string {
    if (!this.analysis) return '';

    if (this.analysis.ageGroup === 'Under 20') {
      return 'Focus on gentle cleansing, hydration and sunscreen. Avoid too many strong actives.';
    }

    if (this.analysis.ageGroup === '20-40' || this.analysis.ageGroup === '18-25') {
      return 'Focus on prevention, sunscreen, hydration and targeted treatments.';
    }

    return 'Focus on barrier support, sunscreen and renewal ingredients introduced slowly.';
  }

  getHydrationScore(): number {
    if (!this.analysis) return 50;

    let score = 55;

    if (this.analysis.waterLevel === 'High') score += 30;
    if (this.analysis.waterLevel === 'Medium') score += 15;
    if (this.analysis.waterLevel === 'Low') score -= 10;

    if (this.analysis.skinType === 'Dry') score -= 15;
    if (this.analysis.concerns.includes('Dryness')) score -= 15;

    return Math.max(20, Math.min(score, 100));
  }

  getSensitivityLevel(): string {
    if (!this.analysis) return 'Low';

    if (
      this.analysis.skinType === 'Sensitive' ||
      this.analysis.answers.irritation === 'Yes' ||
      this.analysis.answers.allergies === 'Yes'
    ) {
      return 'High';
    }

    if (this.analysis.concerns.includes('Acne') || this.analysis.concerns.includes('Dryness')) {
      return 'Medium';
    }

    return 'Low';
  }

  getRoutineMatch(): number {
    if (!this.analysis) return 80;

    let score = 88;

    if (this.analysis.concerns.length >= 2) score += 4;

    if (this.analysis.budget) score += 3;

    if (
      this.analysis.answers.sleep === 'No' ||
      this.analysis.answers.stress === 'Yes'
    ) {
      score -= 6;
    }

    return Math.max(70, Math.min(score, 99));
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  startNewAnalysis(): void {
    this.skinDataService.clearAnalysisData();
    localStorage.removeItem('analysisResult');
    this.router.navigate(['/analysis']);
  }
}