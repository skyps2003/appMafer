import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../core/interfaces/customer';
import { BaseService } from '../helpers/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService{

  private customerURL = "http://127.0.0.1:8000/api/v1/customer"

  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createCustomer(customer: Customer): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.customerURL, customer, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCustomer(id: number, customer: Customer): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.customerURL}/${id}`, customer, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCustomer(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.customerURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
