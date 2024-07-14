import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailedProduct } from '../interfaces/detailed-product';

@Injectable({
  providedIn: 'root'
})
export class DetailedProductService {
  
  private detailedProductURL = 'http://127.0.0.1:8000/api/v1/detailedProduct'
  private http = inject(HttpClient)

  getDetailedProducts(): Observable<DetailedProduct[]> {
    return this.http.get<DetailedProduct[]>(this.detailedProductURL);
  }

  getDetailed(id: number): Observable<DetailedProduct> {
    return this.http.get<DetailedProduct>(`${this.detailedProductURL}/${id}`);
  }

  createDetailedProduct(detailedProduct: DetailedProduct): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.detailedProductURL, detailedProduct);
  }

  updateDetailedProduct(id: number, detailedProduct: DetailedProduct): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.detailedProductURL}/${id}`, detailedProduct);
  }

  deleteDetailedProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.detailedProductURL}/${id}`);
  }
}
