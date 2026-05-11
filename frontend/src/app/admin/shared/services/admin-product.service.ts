import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminProduct {
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

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private apiUrl = 'https://localhost:7196/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(this.apiUrl);
  }

  addProduct(product: AdminProduct): Observable<AdminProduct> {
    return this.http.post<AdminProduct>(this.apiUrl, product);
  }

  updateProduct(id: number, product: AdminProduct): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}