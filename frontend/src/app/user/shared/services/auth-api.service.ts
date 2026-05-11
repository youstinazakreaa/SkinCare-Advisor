import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  id: number;
  fullName: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private authUrl = 'https://localhost:7196/api/Auth';
  private analysisUrl = 'https://localhost:7196/api/Analysis';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, data);
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, data);
  }

  getLatestAnalysisResult(userId: number): Observable<any> {
    return this.http.get<any>(`${this.analysisUrl}/user/${userId}/latest-result`);
  }
}