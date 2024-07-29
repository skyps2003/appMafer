import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomerTypeService } from '../../../services/api/customer-type.service';
import { CustomerType } from '../../../core/interfaces/customer-type';

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [ValidationErrorComponent, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
})
export class CustomerComponentModal {
  private fb = inject(FormBuilder);
  private customerTypeService = inject(CustomerTypeService);

  customerTypes: CustomerType[] = [];
  public customerForm!: FormGroup;

  faTimes = faTimes;

  @Input() customer: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
      customer_type_id: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }

    this.loadCustomerTypes();
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      this.save.emit(this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
      console.log('hola');
    }
  }

  closeModal() {
    this.close.emit();
  }

  loadCustomerTypes() {
    return this.customerTypeService.getCustomers().subscribe((data) => {
      this.customerTypes = data;
      console.log(data);
    });
  }
}
