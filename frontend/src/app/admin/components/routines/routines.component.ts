import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GeneratedRoutine {
  id: number;
  skinAnalysisId: number;
  userName: string | null;
  skinType: string;
  budget: string;
  concerns: string;
  morningSteps: string;
  nightSteps: string;
  focusNote: string;
  createdAt: string;
}

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routines.component.html',
})
export class RoutinesComponent implements OnInit {
  routines: GeneratedRoutine[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRoutines();
  }

  loadRoutines(): void {
    this.isLoading = true;

    this.http
      .get<GeneratedRoutine[]>('https://localhost:7196/api/Routine')
      .subscribe({
        next: (res) => {
          this.routines = res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          alert('Error loading routines');
        }
      });
  }

  splitSteps(steps: string): string[] {
    if (!steps) return [];

    return steps
      .split(',')
      .map(step => step.trim())
      .filter(step => step);
  }

  getUserName(routine: GeneratedRoutine): string {
    return routine.userName || 'Unknown User';
  }

  getSubtitle(routine: GeneratedRoutine): string {
    return `${routine.skinType || 'Unknown'} Skin Routine`;
  }
}