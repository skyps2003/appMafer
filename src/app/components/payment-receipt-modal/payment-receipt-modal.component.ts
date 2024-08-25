import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../services/helpers/notification-service.service';
import { Order } from '../../core/interfaces/order';
import { OrderService } from '../../services/api/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-receipt-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-receipt-modal.component.html'
})
export class PaymentReceiptModalComponent {
  
  @Input() orderId: number | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();

  private orderService = inject(OrderService);
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder); 

  public isValidImage: boolean = true;
  public imgForm: FormGroup;
  public preview: string | null = null;

  constructor() {
    this.imgForm = this.fb.group({
      img: [null]
    });
  }

  captureImg(event: any): void {
    const archiveCapture = event.target.files[0];

    if (archiveCapture && archiveCapture.type.startsWith('image/')) {
      this.isValidImage = true;
      this.extractBase64(archiveCapture).then((imagen: any) => {
        this.preview = imagen.base;
        this.imgForm.patchValue({ img: imagen.base });
      });
    } else {
      this.isValidImage = false;
      this.preview = null;
      this.imgForm.patchValue({ img: null });
      this.notification.showErrorToast('Por favor ingrese un archivo de tipo imagen');
    }
  }

  extractBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ base: reader.result });
      };
      reader.onerror = (error) => {
        reject({ base: null });
      };
    });
  }

  uploadImage(): void {
    const image = this.imgForm.get('img')?.value;

    if (image && this.orderId !== null) {
      this.orderService.updateImage(this.orderId, image).subscribe(
        (response) => {
          console.log('Imagen actualizada correctamente:', response);
          this.notification.showSuccessToast('Imagen actualizada correctamente');
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar la imagen:', error);
          this.notification.showErrorToast('Error al actualizar la imagen');
        }
      );
    } else {
      this.notification.showErrorToast('Por favor seleccione una imagen antes de subir.');
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
