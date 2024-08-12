import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory, InventoryResponse } from '../../core/interfaces/inventory';
import { BaseService } from '../helpers/base.service';
import { API_URL } from '../../utils/apiurl';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService{

  private inventoryURL = API_URL+"inventory"
  private http = inject(HttpClient)

  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getInventories(): Observable<InventoryResponse> {
    return this.http.get<InventoryResponse>(this.inventoryURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getInventory(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.inventoryURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createInventory(inventory: Inventory): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.inventoryURL, inventory, {
      headers: this.getAuthHeaders(),
    });
  }

  updateInventory(id: number, inventory: Inventory): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.inventoryURL}/${id}`, inventory, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteInventory(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.inventoryURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  amountInventory(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.inventoryURL}/amount`,{}, {
      headers: this.getAuthHeaders(),
    });
  }
  updateStock(id: number, stock: number): Observable<{ message: string }> {
    const url = `${this.inventoryURL}/updateStock/${id}/stock/${stock}`;
    return this.http.put<{ message: string }>(url, {});
  }

  updateStatus(id: number): Observable<{ message: string }> {
    const url = `${this.inventoryURL}/updateStatus/${id}`;
    return this.http.put<{ message: string }>(url, {});
  }
}
