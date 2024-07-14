import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { exhaust, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://127.0.0.1:8000/api/auth"

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private tokenKey = 'authToken'

  private currentUser: any | null = null; 

  constructor(private http: HttpClient, private router: Router) {}
  

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }, { headers: this.headers })
      .pipe(
        tap(response => {
          if(response.token){
            console.log(response.token)
            this.setToquen(response.token)
            this.loadUser(response.user)
          }
        })
      );
  }
  loadUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  getCurrentUser(): any | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private setToquen(token: string):void{
    localStorage.setItem(this.tokenKey, token)
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login'])
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if(!token)
    {
      return false
    }
    const payload = JSON.parse(atob(token.split('.')[1]))

    const exp = payload.exp * 1000

    return Date.now() < exp
  }

  getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else{
      return null
    }
  }

}
