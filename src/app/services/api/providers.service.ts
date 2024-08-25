import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../helpers/base.service';
import { Provider, ProviderResponse } from '../../core/interfaces/provider';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService extends BaseService {
  private providerURL = API_URL+'provider';
  private providerRUCURL = API_URL;
  private http = inject(HttpClient);

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getProviders(): Observable<ProviderResponse> {
    return this.http.get<ProviderResponse>(this.providerURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getProvider(id: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.providerURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createProvider(provider: Provider): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.providerURL, provider, {
      headers: this.getAuthHeaders(),
    });
  }

  updateProvider(
    id: number,
    provider: Provider
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.providerURL}/${id}`,
      provider,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteProvider(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.providerURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getProviderRUC(ruc: string): Observable<any> {
    return this.http.get<any>(`${this.providerRUCURL}consultar-ruc/${ruc}`,
      { headers: this.getAuthHeaders() });
  }

  amountProvider(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.providerURL}/amount`,{}, {
      headers: this.getAuthHeaders(),
    });
  }
}
