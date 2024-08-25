import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomerTypeService } from '../../../services/api/customer-type.service';
import { CustomerType } from '../../../core/interfaces/customer-type';
import { ProvidersService } from '../../../services/api/providers.service';
import { NotificationService } from '../../../services/helpers/notification-service.service';

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [ValidationErrorComponent, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customer.component.html',
})
export class CustomerComponentModal {
  private fb = inject(FormBuilder);
  private providersService = inject(ProvidersService)
  private notify = inject(NotificationService)

  public customerForm!: FormGroup;
  isLoadings: boolean = false
  rucInput: string = '';

  faTimes = faTimes;

  @Input() customer: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/), Validators.minLength(8), Validators.maxLength(8)]],
      ruc: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      reason: ['', []],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/), Validators.minLength(9), Validators.maxLength(9)]],
    });

    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }

  }

  saveCustomer() {
    if (this.customerForm.valid) {
      this.save.emit(this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.close.emit();
  }
  buscarRUC() {
    this.isLoadings = true
    if (this.rucInput.trim() !== '') {
      this.providersService.getProviderRUC(this.rucInput).subscribe(
        (response: any) => {
          if (response) {
            this.customerForm.patchValue({
              ruc: response.numeroDocumento,
              name: response.razonSocial,
              phone: '',
              email: '',
              address: response.direccion,
              reason: response.razonSocial,
            });
            this.isLoadings = false
          } else {
            this.notify.showErrorToast(
              'No se encontraron datos para el RUC ingresado.'
            );
          }
        },
        (error) => {
          this.notify.showErrorToast(
            'Ocurrió un error al buscar el RUC.'
          );
        }
      );
    }
  }

}
