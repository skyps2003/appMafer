import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventoryURL = "http://127.0.0.1:8000/api/v1/inventory"
  private http = inject(HttpClient)

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.inventoryURL);
  }

  getInventory(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.inventoryURL}/${id}`);
  }

  createInventory(inventory: Inventory): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.inventoryURL, inventory);
  }

  updateInventory(id: number, inventory: Inventory): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.inventoryURL}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.inventoryURL}/${id}`);
  }
}
