import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AdminProduct,
  AdminProductService
} from '../../shared/services/admin-product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: AdminProduct[] = [];

  searchText = '';
  selectedBudget = '';
  selectedPeriod = '';
  isLoading = false;

  isFormOpen = false;
  isEditMode = false;
  editingId: number | null = null;

  formProduct: AdminProduct = this.emptyProduct();

  constructor(private productService: AdminProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get filteredProducts(): AdminProduct[] {
    const search = this.searchText.trim().toLowerCase();

    return this.products.filter(product => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.matchesStep.toLowerCase().includes(search);

      const matchesBudget =
        !this.selectedBudget || product.budget === this.selectedBudget;

      const matchesPeriod =
        !this.selectedPeriod || product.period === this.selectedPeriod;

      return matchesSearch && matchesBudget && matchesPeriod;
    });
  }

  emptyProduct(): AdminProduct {
    return {
      name: '',
      brand: '',
      category: '',
      budget: '',
      imageUrl: '',
      description: '',
      matchesStep: '',
      period: ''
    };
  }

  loadProducts(): void {
    this.isLoading = true;

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Error loading products');
      }
    });
  }

  openAddForm(): void {
    this.isFormOpen = true;
    this.isEditMode = false;
    this.editingId = null;
    this.formProduct = this.emptyProduct();
  }

  openEditForm(product: AdminProduct): void {
    this.isFormOpen = true;
    this.isEditMode = true;
    this.editingId = product.id || null;
    this.formProduct = { ...product };
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.isEditMode = false;
    this.editingId = null;
    this.formProduct = this.emptyProduct();
  }

  saveProduct(): void {
    if (
      !this.formProduct.name ||
      !this.formProduct.brand ||
      !this.formProduct.category ||
      !this.formProduct.budget ||
      !this.formProduct.matchesStep ||
      !this.formProduct.period
    ) {
      alert('Please fill required fields');
      return;
    }

    if (this.isEditMode && this.editingId) {
      this.productService.updateProduct(this.editingId, this.formProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => {
          console.error(err);
          alert('Error updating product');
        }
      });
    } else {
      this.productService.addProduct(this.formProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => {
          console.error(err);
          alert('Error adding product');
        }
      });
    }
  }

deleteProduct(product: AdminProduct): void {
  console.log('Product to delete:', product);

  if (!product.id) {
    alert('This product has no ID, cannot delete it.');
    return;
  }

  const confirmed = confirm(`Delete ${product.name}?`);

  if (!confirmed) return;

  this.productService.deleteProduct(product.id).subscribe({
    next: () => {
      alert('Product deleted successfully');
      this.loadProducts();
    },
    error: (err) => {
      console.error('Delete error:', err);
      alert(err?.error || err?.message || 'Error deleting product');
    }
  });
}

  getImageUrl(product: AdminProduct): string {
    if (!product.imageUrl) return 'assets/no-image.png';

    if (product.imageUrl.startsWith('http')) {
      return product.imageUrl;
    }

    return 'https://localhost:7196/' + product.imageUrl;
  }
}