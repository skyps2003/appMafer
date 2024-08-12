import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerType } from '../../core/interfaces/customer-type';
import { BaseService } from '../helpers/base.service';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService extends BaseService {

  private customerURL = API_URL+"customerType"

  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCustomers(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(this.customerURL, {
      headers: this.getAuthHeaders(),
    });
  }
}
