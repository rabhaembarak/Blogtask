import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  fetchCsrfToken(): Observable<any> {
    return this.http.get<{ csrfToken: string }>('/api/csrf-token');
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }
}