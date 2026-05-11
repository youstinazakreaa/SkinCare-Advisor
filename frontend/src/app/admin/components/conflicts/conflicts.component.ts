import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AdminConflict,
  AdminConflictService
} from '../../shared/services/admin-conflict.service';

@Component({
  selector: 'app-conflicts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conflicts.component.html',
})
export class ConflictsComponent implements OnInit {
  conflicts: AdminConflict[] = [];
  isLoading = false;

  formConflict: AdminConflict = {
    productOne: '',
    productTwo: '',
    reason: ''
  };

  constructor(private conflictService: AdminConflictService) {}

  ngOnInit(): void {
    this.loadConflicts();
  }

  loadConflicts(): void {
    this.isLoading = true;

    this.conflictService.getConflicts().subscribe({
      next: (res) => {
        this.conflicts = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Error loading conflicts');
      }
    });
  }

  addConflict(): void {
    if (
      !this.formConflict.productOne ||
      !this.formConflict.productTwo ||
      !this.formConflict.reason
    ) {
      alert('Please fill all fields');
      return;
    }

    this.conflictService.addConflict(this.formConflict).subscribe({
      next: () => {
        this.formConflict = {
          productOne: '',
          productTwo: '',
          reason: ''
        };

        this.loadConflicts();
      },
      error: (err) => {
        console.error(err);
        alert('Error adding conflict');
      }
    });
  }

  deleteConflict(conflict: AdminConflict): void {
    if (!conflict.id) return;

    const confirmed = confirm(
      `Delete conflict: ${conflict.productOne} + ${conflict.productTwo}?`
    );

    if (!confirmed) return;

    this.conflictService.deleteConflict(conflict.id).subscribe({
      next: () => {
        this.loadConflicts();
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting conflict');
      }
    });
  }
}