import { Component, OnInit } from '@angular/core';
import { CommonModule ,NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AnalysisApiService } from '../../shared/services/analysis-api.service';

import {
  SkinAnalysisData,
  SkinDataService
} from '../../shared/services/skin-data.service';

@Component({
  selector: 'app-skinanalysis',
  standalone: true,
  imports: [CommonModule , NgClass],
  templateUrl: './skinanalysis.component.html',
  styleUrl: './skinanalysis.component.css'
})
export class SkinanalysisComponent implements OnInit {
  skinType = '';
  ageGroup = '';
  budget = '';
  sunExposure = '';
  waterLevel = '';
  isLoading = false;
 aiStep = 0;
 showLoginWarning = false;

aiSteps = [
  'Reading your skin profile...',
  'Analyzing concerns and lifestyle answers...',
  'Selecting suitable skincare steps...',
  'Matching products with your budget...',
  'Checking ingredient conflicts...',
  'Finalizing your AI routine...'
];



  concerns: string[] = [];
  habits: string[] = [];
  selectedProducts: string[] = [];

  answers: Record<string, string> = {
    acneNow: '',
    irritation: '',
    makeup: '',
    allergies: '',
    sleep: '',
    stress: '',
    diet: ''
  };

  yesNoQuestions = [
    { key: 'acneNow', question: 'Do you currently have acne?' },
    { key: 'irritation', question: 'Do you experience irritation often?' },
    { key: 'makeup', question: 'Do you use makeup daily?' },
    { key: 'allergies', question: 'Do you have allergies to skincare products?' }
  ];

  lifestyleQuestions = [
    { key: 'sleep', question: 'Do you sleep at least 6-8 hours?' },
    { key: 'stress', question: 'Do you have high stress levels?' },
    { key: 'diet', question: 'Do you follow a healthy diet?' }
  ];

  productCatalog = [
    'Gentle Cleanser',
    'Foaming Cleanser',
    'Niacinamide Serum',
    'Vitamin C Serum',
    'Salicylic Acid Treatment',
    'Ceramide Moisturizer',
    'Gel Moisturizer',
    'SPF 50 Sunscreen',
    'Retinol Serum',
    'AHA/BHA Exfoliant'
  ];

  constructor(
    private router: Router,
    private skinDataService: SkinDataService,
    private analysisApi: AnalysisApiService
  ) {}

  ngOnInit(): void {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn !== 'true') {

    this.showLoginWarning = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2200);
  }
}

  toggle(list: string[], item: string): string[] {
    return list.includes(item)
      ? list.filter(x => x !== item)
      : [...list, item];
  }

  toggleConcern(item: string): void {
    this.concerns = this.toggle(this.concerns, item);
  }

  toggleHabit(item: string): void {
    this.habits = this.toggle(this.habits, item);
  }

  toggleProduct(item: string): void {
    this.selectedProducts = this.toggle(this.selectedProducts, item);
  }

  setAnswer(key: string, value: string): void {
    this.answers[key] = value;
  }

  isFormValid(): boolean {
    return (
      this.skinType !== '' &&
      this.ageGroup !== '' &&
      this.budget !== '' &&
      this.sunExposure !== '' &&
      this.waterLevel !== '' &&
      this.concerns.length > 0 &&
      this.habits.length > 0 &&
      this.selectedProducts.length > 0 &&
      this.answers['acneNow'] !== '' &&
      this.answers['irritation'] !== '' &&
      this.answers['makeup'] !== '' &&
      this.answers['allergies'] !== '' &&
      this.answers['sleep'] !== '' &&
      this.answers['stress'] !== '' &&
      this.answers['diet'] !== ''
    );
  }

saveAnalysisData(): SkinAnalysisData {
if (!this.isFormValid()) {
  return {} as SkinAnalysisData;
}

    const data: SkinAnalysisData = {
      skinType: this.skinType,
      ageGroup: this.ageGroup,
      budget: this.budget,
      sunExposure: this.sunExposure,
      waterLevel: this.waterLevel,
      concerns: this.concerns,
      habits: this.habits,
      selectedProducts: this.selectedProducts,
      answers: {
        acneNow: this.answers['acneNow'],
        irritation: this.answers['irritation'],
        makeup: this.answers['makeup'],
        allergies: this.answers['allergies'],
        sleep: this.answers['sleep'],
        stress: this.answers['stress'],
        diet: this.answers['diet']
      }
    };

    this.skinDataService.setAnalysisData(data);
      return data;
  }



generateRoutine(): void {
  if (!this.isFormValid()) return;

  this.isLoading = true;
  this.aiStep = 0;

  this.saveAnalysisData();

  const minLoadingTime = 3600;
  const startTime = Date.now();

  const interval = setInterval(() => {
    if (this.aiStep < this.aiSteps.length - 1) {
      this.aiStep++;
    }
  }, 550);

  const payload = {
    userId: Number(localStorage.getItem('userId')),
    skinType: this.skinType,
    ageGroup: this.ageGroup,
    budget: this.budget,
    sunExposure: this.sunExposure,
    waterLevel: this.waterLevel,
    concerns: this.concerns.join(','),
    habits: this.habits.join(','),
    selectedProducts: this.selectedProducts.join(','),
    acneNow: this.answers['acneNow'],
    irritation: this.answers['irritation'],
    makeup: this.answers['makeup'],
    allergies: this.answers['allergies'],
    sleep: this.answers['sleep'],
    stress: this.answers['stress'],
    diet: this.answers['diet']
  };

  this.analysisApi.generateAnalysis(payload).subscribe({
    next: (res) => {
      console.log('API Response:', res);

      localStorage.setItem('analysisResult', JSON.stringify(res));

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(minLoadingTime - elapsed, 0);

      setTimeout(() => {
        clearInterval(interval);
        this.aiStep = this.aiSteps.length - 1;

        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/routine']);
        }, 600);
      }, remainingTime);
    },

    error: (err) => {
      console.log(err);

      clearInterval(interval);
      this.isLoading = false;

      alert('Error while generating analysis');
    }
  });
}


  viewProducts(): void {
    if (!this.isFormValid()) return;

    this.saveAnalysisData();
    this.router.navigate(['/products']);
  }
}