import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = API_URL + "auth";
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
  private tokenKey = 'authToken';
  private currentUser: any | null = null; 

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }, { headers: this.getAuthHeaders() })
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
            this.loadUser(response.token);  // Load user details after setting token
          }
        })
      );
  }
  
  private loadUser(token: string): void {
    this.http.post<any>(`${this.baseUrl}/me`, { token }, { headers: this.getAuthHeaders() })
      .subscribe(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
  }

  getCurrentUser(): any | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('currentUser'); // Remove user details on logout
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
