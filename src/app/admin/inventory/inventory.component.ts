import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from '../../services/api/inventory.service';
import { RouterLink } from '@angular/router';
import { Inventory, InventoryResponse } from '../../core/interfaces/inventory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  faPlus = faPlus;

  private inventoryService = inject(InventoryService);

  inventories: Inventory[] = [];

  ngOnInit() {
    this.loadInventories();
  }

  loadInventories() {
    this.inventoryService.getInventories().subscribe(
      (response: InventoryResponse) => {
        this.inventories = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
