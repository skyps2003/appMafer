import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from '../../services/api/inventory.service';
import { RouterLink } from '@angular/router';
import { Inventory, InventoryResponse } from '../../core/interfaces/inventory';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/helpers/notification-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule, LoaderComponent, FormsModule],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  faPlus = faPlus;

  private inventoryService = inject(InventoryService);
  private notify = inject(NotificationService)
  inventories: Inventory[] = [];
  isLoading: boolean = false
  stockValues: { [key: number]: number } = {};
  ngOnInit() {
    this.loadInventories();
  }

  loadInventories() {
    this.isLoading = true
    this.inventoryService.getInventories().subscribe(
      (response: InventoryResponse) => {
        this.inventories = response.data.inventories;
        this.isLoading = false
      },
      (error) => {
        console.log(error);
      }
    );
  }
  initializeStockValues(): void {
    this.inventories.forEach(inventory => {
      this.stockValues[inventory.id] = 0; 
    });
  }
  updateStock(id: number): void {
    const stock = this.stockValues[id];
    if (stock > 0) {
      this.inventoryService.updateStock(id, stock).subscribe(
        response => {
          this.notify.showSuccessToast(response.message);
          this.loadInventories(); 
          this.stockValues = {}
        },
        error => {
          this.notify.showErrorToast(error.error.message);
        }
      );
    } else {
      this.notify.showErrorToast('El stock debe ser un número positivo.');
    }
  }

  updateStatus(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cambio no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventoryService.updateStatus(id).subscribe(
          response => {
            Swal.fire(
              'Actualizado!',
              response.message,
              'success'
            );
            this.loadInventories(); // Recargar la lista de inventarios después de la actualización
          },
          error => {
            Swal.fire(
              'Error!',
              error.error.message,
              'error'
            );
          }
        );
      }
    });
  }
}
