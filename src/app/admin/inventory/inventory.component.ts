import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../interfaces/inventory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent {

  faPlus = faPlus

  private inventoryService = inject(InventoryService)

  inventories: Inventory[] = []

  ngOnInit(){
    this.loadInventories()
  }

  loadInventories(){
    this.inventoryService.getInventories().subscribe(
      (data) => {
        this.inventories = data
        console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
