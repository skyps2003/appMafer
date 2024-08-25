import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from '../../components/loader/loader.component';
import { OrderService } from '../../services/api/order.service';
import { Order, OrderResponse } from '../../core/interfaces/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../services/helpers/notification-service.service';
import Swal from 'sweetalert2';
import { PaymentReceiptModalComponent } from '../../components/payment-receipt-modal/payment-receipt-modal.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FontAwesomeModule, LoaderComponent, CommonModule, FormsModule, PaymentReceiptModalComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  private orderService = inject(OrderService)
  private notify = inject(NotificationService)

  orders: Order[] = []
  faArrowDown = faArrowDown
  isLoading: boolean = false
  private intervalId: any;
  isModalOpen = false;
  selectedOrderId: number | null = null;


  ngOnInit(){
    this.loadInitialOrders()
    this.intervalId = setInterval(() => {
      this.updateOrders();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadInitialOrders(){
    this.isLoading = true
    this.orderService.getOrders().subscribe(
      (response: OrderResponse) => {
        this.orders = response.data
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        this.notify.showErrorToast('Error al cargar las órdenes')
      }
    )
  }

  updateOrders(){
    this.orderService.getOrders().subscribe(
      (response: OrderResponse) => {
        this.orders = response.data
      },
      (error) => {
        this.notify.showErrorToast('Error al actualizar las órdenes')
      }
    )
  }

  orderPay(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar estado'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateStatus(id).subscribe(
          (response) => {
            this.notify.showSuccessToast(response.message)
            this.updateOrders(); 
          },
          (error) => {
            this.notify.showErrorToast(error.error.message)
          }
        )
      }
    })
  }

  onSearch(){

  }

  onSubmitImage(id: number){
    this.selectedOrderId = id;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedOrderId = null; 
  }

}
