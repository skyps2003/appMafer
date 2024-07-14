import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerURL = "http://127.0.0.1:8000/api/v1/customer"

  private http = inject(HttpClient)

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerURL);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerURL}/${id}`);
  }

  createCustomer(customer: Customer): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.customerURL, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.customerURL}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.customerURL}/${id}`);
  }
}
