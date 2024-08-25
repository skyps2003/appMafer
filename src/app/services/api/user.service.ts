import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseUser, User, UserResponse } from '../../core/interfaces/user';
import { BaseService } from '../helpers/base.service';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private userURL = API_URL+"user"
  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.userURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getUser(id: number): Observable<ResponseUser> {
    return this.http.get<ResponseUser>(`${this.userURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createUser(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.userURL, user, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(id: number, user: User): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.userURL}/${id}`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.userURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  updateImage(id: number, image: string): Observable<{ message: string }> {
    const payment = {
      id: id,
      img: image
    }
    return this.http.put<{ message: string }>(`${this.userURL}/updateImage/${id}`, payment, {
      headers: this.getAuthHeaders(),
    });
}
}
