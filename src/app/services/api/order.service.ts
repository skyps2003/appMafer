import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../utils/apiurl';
import { OrderResponse } from '../../core/interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = API_URL+"order";
  private http = inject(HttpClient);

 


  getOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.url);
  }

  updateStatus(id: number):  Observable<{ message: string }>{
    return this.http.put<{ message: string }>(`${this.url}/orderPay/${id}`, []);
  }
}
