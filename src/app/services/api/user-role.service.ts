import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../../core/interfaces/user-role';
import { BaseService } from '../helpers/base.service';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends BaseService{

  private userRoleURL = API_URL+"userRole"
  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.userRoleURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserRole(id: number): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.userRoleURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createUserRole(userRole: UserRole): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.userRoleURL, userRole, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUserRole(id: number, userRole: UserRole): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.userRoleURL}/${id}`, userRole, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUserRole(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.userRoleURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  updateRole(id: number): Observable<{ message: string }> {
    const body = {}
    return this.http.put<{ message: string }>(`${this.userRoleURL}/role/${id}`, body, {
      headers: this.getAuthHeaders(),
    });
  }
}
