import { Injectable } from '@angular/core';

export interface SkinAnalysisData {
  skinType: string;
  ageGroup: string;
  budget: string;
  sunExposure: string;
  waterLevel: string;
  concerns: string[];
  habits: string[];
  selectedProducts: string[];
  answers: {
    acneNow: string;
    irritation: string;
    makeup: string;
    allergies: string;
    sleep: string;
    stress: string;
    diet: string;
  };
}

export interface RoutineSteps {
  morning: string[];
  night: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SkinDataService {
  private analysisData: SkinAnalysisData | null = null;
  private routineSteps: RoutineSteps | null = null;

  setAnalysisData(data: SkinAnalysisData): void {
    this.analysisData = data;
    localStorage.setItem('skinAnalysisData', JSON.stringify(data));
  }

  getAnalysisData(): SkinAnalysisData | null {
    if (this.analysisData) return this.analysisData;

    const savedData = localStorage.getItem('skinAnalysisData');
    return savedData ? JSON.parse(savedData) : null;
  }

  setRoutineSteps(steps: RoutineSteps): void {
    this.routineSteps = steps;
    localStorage.setItem('routineSteps', JSON.stringify(steps));
  }

  getRoutineSteps(): RoutineSteps | null {
    if (this.routineSteps) return this.routineSteps;

    const savedSteps = localStorage.getItem('routineSteps');
    return savedSteps ? JSON.parse(savedSteps) : null;
  }

  clearAnalysisData(): void {
    this.analysisData = null;
    this.routineSteps = null;
    localStorage.removeItem('skinAnalysisData');
    localStorage.removeItem('routineSteps');
  }
}