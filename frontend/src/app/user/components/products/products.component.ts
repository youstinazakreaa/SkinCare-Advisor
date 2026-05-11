import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  SkinAnalysisData,
  SkinDataService
} from '../../shared/services/skin-data.service';

interface Product {
  id?: number;
  name: string;
  brand: string;
  category: string;
  budget: string;
  imageUrl: string;
  description: string;
  matchesStep: string;
  period: string;
}

interface Conflict {
  id?: number;
  productOne: string;
  productTwo: string;
  reason: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  analysis: SkinAnalysisData | null = null;

  morningProducts: Product[] = [];
  nightProducts: Product[] = [];
  alternativeProducts: Product[] = [];
  warnings: string[] = [];

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

    this.morningProducts = this.getOneProductPerStep(result.morningRoutine || []);
    this.nightProducts = this.getOneProductPerStep(result.nightRoutine || []);

    const usedIds = new Set([
      ...this.morningProducts.map(p => p.id),
      ...this.nightProducts.map(p => p.id)
    ]);

    const allProducts: Product[] = [
      ...(result.morningRoutine || []),
      ...(result.nightRoutine || [])
    ];

    this.alternativeProducts = allProducts.filter(product =>
      !usedIds.has(product.id)
    );

    this.warnings = (result.conflicts || []).map((conflict: Conflict) =>
      `<span class="font-semibold text-[#c25b5b]">${conflict.productOne}</span> + <span class="font-semibold text-[#c25b5b]">${conflict.productTwo}</span>: ${conflict.reason}`
    );

    if (this.warnings.length === 0) {
      this.warnings = [
        '<span class="font-semibold text-[#c25b5b]">Retinol</span> + <span class="font-semibold text-[#c25b5b]">AHA/BHA</span>: Avoid using together in the same night.'
      ];
    }
  }

  getOneProductPerStep(products: Product[]): Product[] {
    const seen = new Set<string>();

    return products.filter(product => {
      const step = product.matchesStep?.trim().toLowerCase();

      if (!step || seen.has(step)) {
        return false;
      }

      seen.add(step);
      return true;
    });
  }

  goToRoutine(): void {
    this.router.navigate(['/routine']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}