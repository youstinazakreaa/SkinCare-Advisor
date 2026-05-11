import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  AdminProduct,
  AdminProductService
} from '../../shared/services/admin-product.service';

import {
  AdminUser,
  AdminUserService
} from '../../shared/services/admin-user.service';

import {
  AdminConflict,
  AdminConflictService
} from '../../shared/services/admin-conflict.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  products: AdminProduct[] = [];
  users: AdminUser[] = [];
  conflicts: AdminConflict[] = [];
  recentProducts: AdminProduct[] = [];

  stats = [
    { title: 'Users', value: '0' },
    { title: 'Products', value: '0' },
    { title: 'Routines', value: '0' },
    { title: 'Warnings Rules', value: '0' },
  ];

  quickActions = [
    { title: 'Add New Product', link: '/admin/products' },
    { title: 'Review Routines', link: '/admin/routines' },
    { title: 'Manage Users', link: '/admin/users' },
    { title: 'Conflict Rules', link: '/admin/conflicts' },
  ];

  isLoading = false;

  constructor(
    private productService: AdminProductService,
    private userService: AdminUserService,
    private conflictService: AdminConflictService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.recentProducts = products.slice(-4).reverse();

        this.userService.getUsers().subscribe({
          next: (users) => {
            this.users = users;

            this.conflictService.getConflicts().subscribe({
              next: (conflicts) => {
                this.conflicts = conflicts;

                this.stats = [
                  { title: 'Users', value: String(users.length) },
                  { title: 'Products', value: String(products.length) },
                  { title: 'Routines', value: this.getRoutineCount(products) },
                  { title: 'Warnings Rules', value: String(conflicts.length) },
                ];

                this.isLoading = false;
              },
              error: (err) => {
                console.error(err);

                this.stats = [
                  { title: 'Users', value: String(users.length) },
                  { title: 'Products', value: String(products.length) },
                  { title: 'Routines', value: this.getRoutineCount(products) },
                  { title: 'Warnings Rules', value: '0' },
                ];

                this.isLoading = false;
              }
            });
          },
          error: (err) => {
            console.error(err);

            this.stats = [
              { title: 'Users', value: '0' },
              { title: 'Products', value: String(products.length) },
              { title: 'Routines', value: this.getRoutineCount(products) },
              { title: 'Warnings Rules', value: '0' },
            ];

            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  getRoutineCount(products: AdminProduct[]): string {
    const steps = new Set(
      products
        .map(product => product.matchesStep)
        .filter(step => !!step)
    );

    return String(steps.size);
  }

  getProductStatus(product: AdminProduct): string {
    if (
      product.name &&
      product.brand &&
      product.category &&
      product.budget &&
      product.matchesStep &&
      product.period
    ) {
      return 'Active';
    }

    return 'Draft';
  }
}