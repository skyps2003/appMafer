import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';

import { Inventory } from './../../interfaces/inventory';
import { Component, inject } from '@angular/core';
import { DetailedProductService } from '../../services/detailed-product.service';
import { DetailedProduct } from '../../interfaces/detailed-product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';

interface OrderItem {
  product: DetailedProduct;
  quantity: number;
}
@Component({
  selector: 'app-inventory-control',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './inventory-control.component.html'
})
export class InventoryControlComponent {

  detailedProducts: DetailedProduct[] = [];
  orderList: OrderItem[] = [];
  faTrash = faTrash;

  constructor(private detailedProductService: DetailedProductService) {}
  private inventoryService = inject(InventoryService)

  ngOnInit() {
    this.loadDetailedProducts();
  }

  loadDetailedProducts() {
    this.detailedProductService.getDetailedProducts().subscribe(data => {
      this.detailedProducts = data;
    });
  }

  addToOrder(product: DetailedProduct) {
    const existingItem = this.orderList.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.orderList.push({ product, quantity: 1 });
    }
  }

  incrementQuantity(orderItem: OrderItem) {
    orderItem.quantity++;
  }

  decrementQuantity(orderItem: OrderItem) {
    if (orderItem.quantity > 1) {
      orderItem.quantity--;
    } else {
      this.removeFromOrder(orderItem);
    }
  }

  removeFromOrder(orderItem: OrderItem) {
    const index = this.orderList.indexOf(orderItem);
    if (index > -1) {
      this.orderList.splice(index, 1);
    }
  }

  getTotalCost() {
    return parseFloat(this.orderList.reduce((total, item) => total + (item.product.product.price * item.quantity), 0).toFixed(2));
  }

  trackById(index: number, item: DetailedProduct) {
    return item.id;
  }
  generateReport() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Reporte de ordenes', 14, 22);

    const orderItems = this.orderList.map(item => [
      item.product.product.name,
      item.quantity.toString(),
      `$${(item.product.product.price * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [['Producto', 'Cantidad', 'Total']],
      body: orderItems,
      startY: 30,
      theme: 'grid',
      headStyles: {
        fillColor: [40, 40, 40],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10,
        fontStyle: 'normal'
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Costo total: $${this.getTotalCost().toFixed(2)}`, 14, finalY);

    doc.save('reporte-inventario.pdf');
  }


addToInventory() {
  this.generateReport()
  if (!this.orderList || this.orderList.length === 0) {
    console.error('No hay elementos en la lista de pedidos para agregar al inventario.');
    return;
  }

  const inventories: Inventory[] = [];

  this.orderList.forEach(item => {
    if (item.product && item.product.id && item.quantity) {

      inventories.push({
        stock: item.quantity,
        detailed_product_id: item.product.id,
        location: 'Inventario'
      });
    } else {
      console.error('Faltan datos importantes en el pedido:', item);
    }
  });

  if (inventories.length === 0) {
    console.error('No se encontraron inventarios válidos para enviar.');
    return;
  }


  const observables = inventories.map(inventory =>
    this.inventoryService.createInventory(inventory)
  );

  forkJoin(observables).subscribe(
    responses => {

      this.orderList = [];
      this.showSuccessToast('Inventarios agregados correctamente');
    },
    error => {
      this.showErrorToast('Error al agregar inventarios');
    }
  );
  
}
showSuccessToast(message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'success',
    title: message,
  });
}

showErrorToast(message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'error',
    title: message,
  });
}

  
}
