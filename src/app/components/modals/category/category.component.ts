import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category.component.html'
})
export class CategoryComponentModal {
  faTimes = faTimes

  @Input() category: any = { name: '', description: ''}
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()
  @Input() isLoading: boolean = false

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['',]
    });
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      const formData: Category = {
        ...this.categoryForm.value,
        description: this.categoryForm.value.description || '-- Sin descripción --'
      };
      this.save.emit(formData);
    }
  }

  closeModal() {
    this.close.emit()
  }
}
