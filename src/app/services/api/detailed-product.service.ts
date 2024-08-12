import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailedProduct, DetailedProductResponse } from '../../core/interfaces/detailed-product';
import { BaseService } from '../helpers/base.service';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class DetailedProductService extends BaseService{
  
  private detailedProductURL = API_URL+'detailedProduct'
  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getDetailedProducts(): Observable<DetailedProductResponse> {
    return this.http.get<DetailedProductResponse>(this.detailedProductURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getDetailed(id: number): Observable<DetailedProduct> {
    return this.http.get<DetailedProduct>(`${this.detailedProductURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createDetailedProduct(detailedProduct: DetailedProduct): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.detailedProductURL, detailedProduct, {
      headers: this.getAuthHeaders(),
    });
  }

  updateDetailedProduct(id: number, detailedProduct: DetailedProduct): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.detailedProductURL}/${id}`, detailedProduct, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteDetailedProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.detailedProductURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  amountDetailedProduct(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.detailedProductURL}/amount`,{}, {
      headers: this.getAuthHeaders(),
    });
  }
}
