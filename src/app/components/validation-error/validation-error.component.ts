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
          return this.getCustomErrorMessage(key, this.control.errors[key]);
        }
      }
    }
    return null;
  }

  private getCustomErrorMessage(errorKey: string, errorValue: any): string {
    if (this.customMessages[errorKey]) {
      return this.customMessages[errorKey];
    }
    switch (errorKey) {
      case 'minlength':
        return `Este campo debe tener al menos ${errorValue.requiredLength} caracteres.`;
      case 'maxlength':
        return `Este campo debe tener como máximo ${errorValue.requiredLength} caracteres.`;
      case 'pattern':
        return `El formato del campo es inválido.`;
      default:
        return this.defaultMessages[errorKey] || 'Campo inválido';
    }
  }

  private defaultMessages: ValidationMessages = {
    required: 'Este campo es obligatorio.',
    minlength: 'Este campo debe ser más largo.',
    maxlength: 'Este campo debe ser más corto.',
    email: 'Ingrese una dirección de correo electrónico válida.',
    pattern: 'El formato del campo es inválido.'
  };
}
