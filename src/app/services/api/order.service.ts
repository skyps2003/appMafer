import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { OrderResponse } from '../../core/interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.API_URL+"order";
  private http = inject(HttpClient);

 


  getOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.url);
  }

  updateStatus(id: number):  Observable<{ message: string }>{
    return this.http.put<{ message: string }>(`${this.url}/orderPay/${id}`, []);
  }

  updateImage(id: number, image: string): Observable<{ message: string }> {
    const payment = {
      id: id,
      image: image
    }
    return this.http.put<{ message: string }>(`${this.url}/updateImage/${id}`, payment);
}
}
