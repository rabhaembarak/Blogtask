import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  loginEvent:EventEmitter<void>=new EventEmitter<void>();
  private users: any[];

  constructor(private http: HttpClient, private router: Router) {
    this.users = [];
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:8000/signup')
      .pipe(
        catchError(error => {
          console.error('Failed to fetch user data:', error);
          return throwError('Failed to fetch user data');
        })
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  logout() {
    localStorage.removeItem('fname'); 
  }

  login({ fname, password }: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/login/', { fname, password })
      .pipe(
        catchError(error => {
          console.error('Login failed:', error);
          return throwError('Failed to Login');
        })
      );
  }
}
