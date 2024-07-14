import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRole } from '../interfaces/user-role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private userRoleURL = "http://127.0.0.1:8000/api/v1/userRole"
  private http = inject(HttpClient)

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.userRoleURL);
  }

  getUserRole(id: number): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.userRoleURL}/${id}`);
  }

  createUserRole(userRole: UserRole): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.userRoleURL, userRole);
  }

  updateUserRole(id: number, userRole: UserRole): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.userRoleURL}/${id}`, userRole);
  }

  deleteUserRole(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.userRoleURL}/${id}`);
  }
  updateRole(id: number): Observable<{ message: string }> {
    const body = {}
    return this.http.put<{ message: string }>(`${this.userRoleURL}/role/${id}`, body);
  }
}
