import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../../core/interfaces/product';
import { BaseService } from '../helpers/base.service';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private productURL = API_URL+"product";
  private http = inject(HttpClient);

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.productURL, { headers: this.getAuthHeaders() });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  createProduct(product: Product): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.productURL, product, { headers: this.getAuthHeaders() });
  }

  updateProduct(id: number, product: Product): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.productURL}/${id}`, product, { headers: this.getAuthHeaders() });
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.productURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  amountProduct(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.productURL}/amount`,{}, {
      headers: this.getAuthHeaders(),
    });
  }
}
