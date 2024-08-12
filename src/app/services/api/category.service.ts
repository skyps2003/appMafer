import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../helpers/base.service';
import { Category, CategoryResponse } from '../../core/interfaces/category';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  private categoryURL = API_URL+'category';

  private http = inject(HttpClient);

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.categoryURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createCategory(category: Category): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.categoryURL, category, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCategory(
    id: number,
    category: Category
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.categoryURL}/${id}`,
      category,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteCategory(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.categoryURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  amountCategory(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.categoryURL}/amount`,{}, {
      headers: this.getAuthHeaders(),
    });
  }
}
