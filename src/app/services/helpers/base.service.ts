import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected abstract getToken(): string | null;

  protected getAuthHeaders(): HttpHeaders {
    const token = this.getToken(); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
}
