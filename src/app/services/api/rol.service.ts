import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol, RolResponse } from '../../core/interfaces/rol';
import { BaseService } from '../helpers/base.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService extends BaseService {

  private rolURL = environment.API_URL+"rol"
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
