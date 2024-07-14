import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerType } from '../interfaces/customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  private customerURL = "http://127.0.0.1:8000/api/v1/customerType"

  private http = inject(HttpClient)

  getCustomers(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(this.customerURL);
  }
}
