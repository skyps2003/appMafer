import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productURL = "http://127.0.0.1:8000/api/v1/product"
  private http = inject(HttpClient)

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productURL}/${id}`);
  }

  createProduct(product: Product): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.productURL, product);
  }

  updateProduct(id: number, product: Product): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.productURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.productURL}/${id}`);
  }
}
