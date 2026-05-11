import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminConflict {
  id?: number;
  productOne: string;
  productTwo: string;
  reason: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminConflictService {
  private apiUrl = 'https://localhost:7196/api/Conflicts';

  constructor(private http: HttpClient) {}

  getConflicts(): Observable<AdminConflict[]> {
    return this.http.get<AdminConflict[]>(this.apiUrl);
  }

  addConflict(conflict: AdminConflict): Observable<AdminConflict> {
    return this.http.post<AdminConflict>(this.apiUrl, conflict);
  }

  deleteConflict(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}