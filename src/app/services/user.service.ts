import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = "http://127.0.0.1:8000/api/v1/user"
  private http = inject(HttpClient)

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.userURL}/${id}`);
  }

  createUser(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.userURL, user);
  }

  updateUser(id: number, user: User): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.userURL}/${id}`, user);
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.userURL}/${id}`);
  }
}
