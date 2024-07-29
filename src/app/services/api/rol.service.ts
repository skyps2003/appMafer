import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol, RolResponse } from '../../core/interfaces/rol';
import { BaseService } from '../helpers/base.service';

@Injectable({
  providedIn: 'root'
})
export class RolService extends BaseService {

  private rolURL = "http://127.0.0.1:8000/api/rol"
  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRols(): Observable<RolResponse> {
    return this.http.get<RolResponse>(this.rolURL, {
      headers: this.getAuthHeaders(),
    });
  }
}
