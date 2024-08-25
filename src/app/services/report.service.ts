import { inject, Injectable } from '@angular/core';
import { API_URL } from '../utils/apiurl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = `${API_URL}report/sale`; // Asegúrate de que API_URL esté definido correctamente
  private http = inject(HttpClient);

  // Método para obtener el reporte de ventas
  getSalesReport(startDate: string, endDate: string): Observable<Blob> {
    const params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    // Hacer la solicitud GET con los parámetros
    return this.http.get(this.url, { params, responseType: 'blob' });
  }
}
