import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rolURL = "http://127.0.0.1:8000/api/v1/rol"
  private http = inject(HttpClient)

  getRols(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolURL);
  }
}
