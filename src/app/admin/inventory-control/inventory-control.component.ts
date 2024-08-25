import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { Component, inject } from '@angular/core';
import { DetailedProductService } from '../../services/api/detailed-product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/api/inventory.service';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DetailedProduct, DetailedProductResponse } from '../../core/interfaces/detailed-product';
import { Inventory } from '../../core/interfaces/inventory';
import { NotificationService } from '../../services/helpers/notification-service.service';
import { LoaderComponent } from '../../components/loader/loader.component';

interface OrderItem {
  product: DetailedProduct;
  quantity: number;
}
interface NewInventory {
  stock: number;
  detailed_product_id: number;
  location: string;
}
@Component({
  selector: 'app-inventory-control',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './inventory-control.component.html',
})
export class InventoryControlComponent {
  detailedProducts: DetailedProduct[] = [];
  orderList: OrderItem[] = [];
  faTrash = faTrash;
  discount: number = 0;
  isLoading: boolean = false

  constructor(private detailedProductService: DetailedProductService) {}
  private inventoryService = inject(InventoryService);
  private notification = inject(NotificationService)

  ngOnInit() {
    this.loadDetailedProducts();
  }

  loadDetailedProducts() {
    this.isLoading = true
    this.detailedProductService.getDetailedProducts().subscribe((response: DetailedProductResponse) => {
      this.detailedProducts = response.data;
      this.isLoading = false
    });
  }

  addToOrder(product: DetailedProduct) {
    const existingItem = this.orderList.find(
      (item) => item.product.id === product.id
    );
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

  updateQuantity(orderItem: OrderItem) {
    if (orderItem.quantity < 1) {
      orderItem.quantity = 1;
    }
  }

  removeFromOrder(orderItem: OrderItem) {
    const index = this.orderList.indexOf(orderItem);
    if (index > -1) {
      this.orderList.splice(index, 1);
    }
  }

  getTotalCost() {
    return parseFloat(
      this.orderList
        .reduce(
          (total, item) => total + item.product.product.price * item.quantity,
          0
        )
        .toFixed(2)
    );
  }
  getTotalCostWithDiscount() {
    const totalCost = this.getTotalCost();
    const discountAmount = (this.discount / 100) * totalCost;
    return (totalCost - discountAmount).toFixed(2);
  }

  applyDiscount() {
    this.getTotalCostWithDiscount();
  }

  trackById(index: number, item: DetailedProduct) {
    return item.id;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  generateReport() {
    const doc = new jsPDF();

    const pdfWidth = doc.internal.pageSize.getWidth();

    const currentDate = new Date().toLocaleDateString();
    
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    const margin = 10; 
    doc.text(`Fecha: ${currentDate}`, pdfWidth - margin, margin, { align: 'right' });

  
    const imageData = './logo.png'; 

    const imageWidth = 50; 
    const imageHeight = 30; 

    const x = (pdfWidth - imageWidth) / 2;

    doc.addImage(imageData, 'JPEG', x, 20, imageWidth, imageHeight); 

    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Reporte de Ordenes', 14, imageHeight + 30); 

    const orderItems = this.orderList.map((item) => {
      const unitPrice = item.product.product.price;
      const total = unitPrice * item.quantity;
      return [
        item.product.product.name,
        item.quantity.toString(),
        `$${unitPrice.toFixed(2)}`,
        `$${total.toFixed(2)}`      
      ];
    });

    autoTable(doc, {
      head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
      body: orderItems,
      startY: imageHeight + 40, 
      theme: 'grid',
      headStyles: {
        fillColor: [40, 40, 40],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 10,
        fontStyle: 'normal',
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
      },
      margin: { top: imageHeight + 40 },
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Resumen del Pedido', 14, finalY + 10);

    doc.text(`Descuento aplicado: $${this.discount.toFixed(2)}`, 14, finalY + 20);

    const totalWithDiscount = this.getTotalCost() - this.discount;
    doc.text(`Total con Descuento: $${totalWithDiscount.toFixed(2)}`, 14, finalY + 30);

    doc.save('reporte-inventario.pdf');
}


  addToInventory() {
    this.generateReport();
    if (!this.orderList || this.orderList.length === 0) {
      console.error(
        'No hay elementos en la lista de pedidos para agregar al inventario.'
      );
      return;
    }

    const inventories: Inventory[] = [];

    this.orderList.forEach((item) => {
      if (item.product && item.product.id && item.quantity) {
        const newInventory: NewInventory = {
          stock: item.quantity,
          detailed_product_id: item.product.id,
          location: 'Inventario',
        };
        inventories.push(newInventory as unknown as Inventory);
      } else {
        console.error('Faltan datos importantes en el pedido:', item);
      }
    });

    if (inventories.length === 0) {
      console.error('No se encontraron inventarios válidos para enviar.');
      return;
    }

    const observables = inventories.map((inventory) =>
      this.inventoryService.createInventory(inventory)
    );

    forkJoin(observables).subscribe(
      (responses) => {
        this.orderList = [];
        this.notification.showSuccessToast('Inventarios agregados correctamente');
      },
      (error) => {
        this.notification.showErrorToast('Error al agregar inventarios');
      }
    );
  }

}
