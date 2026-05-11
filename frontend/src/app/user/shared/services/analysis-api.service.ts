import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisApiService {

  private apiUrl = 'https://localhost:7196/api/Analysis';

  constructor(private http: HttpClient) {}

  generateAnalysis(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}