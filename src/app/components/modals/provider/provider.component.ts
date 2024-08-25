import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonFormComponent } from '../../buttons/button-form/button-form.component';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { ProvidersService } from '../../../services/api/providers.service';
import { Provider } from '../../../core/interfaces/provider';
import { NotificationService } from '../../../services/helpers/notification-service.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-provider-modal',
  standalone: true,
  imports: [
    ValidationErrorComponent,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonFormComponent,
    LoaderComponent
  ],
  templateUrl: './provider.component.html',
})
export class ProviderComponentModal {
  faTimes = faTimes;
  faSave = faSave;
  rucInput: string = '';
  isLoadings: boolean = false

  @Input() provider: any = {
    id: null,
    ruc: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
  };
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  providerForm: FormGroup;
  private providerService = inject(ProvidersService);
  private notification = inject(NotificationService);

  get rucFb() {
    return this.providerForm.controls['ruc'];
  }
  get nameFb() {
    return this.providerForm.controls['name'];
  }
  get phoneFb() {
    return this.providerForm.controls['phone'];
  }
  get emailFb() {
    return this.providerForm.controls['email'];
  }
  get addressFb() {
    return this.providerForm.controls['address'];
  }
  get reasonFb() {
    return this.providerForm.controls['reason'];
  }

  constructor(private fb: FormBuilder) {
    this.providerForm = this.fb.group({
      ruc: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      name: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      reason: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.provider) {
      this.providerForm.patchValue(this.provider);
    }
  }

  saveProvider() {
    if (!this.providerForm.valid) {
      this.providerForm.markAsTouched();
      this.providerForm.markAsDirty();
      return;
    }

    const updatedProvider = { ...this.provider, ...this.providerForm.value };
    this.save.emit(updatedProvider);
  }

  closeModal() {
    this.close.emit();
  }

  buscarRUC() {
    this.isLoadings = true
    if (this.rucInput.trim() !== '') {
      this.providerService.getProviderRUC(this.rucInput).subscribe(
        (response: any) => {
          if (response) {
            this.providerForm.patchValue({
              ruc: response.numeroDocumento,
              name: response.razonSocial,
              phone: '',
              email: '',
              address: response.direccion,
              reason: response.razonSocial,
            });
            this.isLoadings = false
          } else {
            this.notification.showErrorToast(
              'No se encontraron datos para el RUC ingresado.'
            );
          }
        },
        (error) => {
          console.error('Error fetching provider data:', error);
          this.notification.showErrorToast(
            'Ocurrió un error al buscar el RUC.'
          );
        }
      );
    }
  }
}
