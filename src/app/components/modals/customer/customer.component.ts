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
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/), Validators.minLength(8), Validators.maxLength(8)]],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      customer_type_id: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/), Validators.minLength(9), Validators.maxLength(9)]],
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
