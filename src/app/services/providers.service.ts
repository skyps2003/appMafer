import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../interfaces/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private providerURL = "http://127.0.0.1:8000/api/v1/provider"
private providerRUCURL = "http://127.0.0.1:8000/v1/api/"
  private http = inject(HttpClient)

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.providerURL);
  }

  getProvider(id: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.providerURL}/${id}`);
  }

  createProvider(provider: Provider): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.providerURL, provider);
  }

  updateProvider(id: number, provider: Provider): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.providerURL}/${id}`, provider);
  }

  deleteProvider(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.providerURL}/${id}`);
  }

  getProviderRUC(ruc: string): Observable<any> {
    return this.http.get<any>(`${this.providerRUCURL}consultar-ruc/${ruc}`);
  }
}


