import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryURL = "http://127.0.0.1:8000/api/v1/category"

  private http = inject(HttpClient)

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryURL);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryURL}/${id}`);
  }

  createCategory(category: Category): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.categoryURL, category);
  }

  updateCategory(id: number, category: Category): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.categoryURL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.categoryURL}/${id}`);
  }
}
