import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

interface ValidationMessages {
  [key: string]: string;
}

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [],
  templateUrl: './validation-error.component.html'})

export class ValidationErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() customMessages: ValidationMessages = {};

  get errorMessage(): string | null {
    if (this.control && this.control.errors) {
      for (const key in this.control.errors) {
        if (this.control.errors.hasOwnProperty(key) && (this.control.touched || this.control.dirty)) {
          return this.customMessages[key] || this.defaultMessages[key] || 'Campo inválido';
        }
      }
    }
    return null;
  }

  private defaultMessages: ValidationMessages = {
    required: 'Este campo es obligatorio.',
    minlength: 'Este campo debe ser más largo.',
    email: 'Ingrese una dirección de correo electrónico válida.'
  };
}
