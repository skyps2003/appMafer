import { inject, Injectable } from '@angular/core';
import { BaseService } from '../helpers/base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompanyResponse } from '../../core/interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService {
  private companyURL = 'http://127.0.0.1:8000/api/company';

  private http = inject(HttpClient);

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getCompany(id: number): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${this.companyURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
