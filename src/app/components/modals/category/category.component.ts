import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { ButtonFormComponent } from '../../buttons/button-form/button-form.component';
import { faSave } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, ReactiveFormsModule, ValidationErrorComponent, ButtonFormComponent],
  templateUrl: './category.component.html'
})
export class CategoryComponentModal {
  faTimes = faTimes;
  faSave = faSave

  @Input() category: any = { id: null, name: '', description: '' };
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  categoryForm: FormGroup;
  
  get nameFb() { return this.categoryForm.controls['name']; }
  get descriptionFb() { return this.categoryForm.controls['description']; }

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  ngOnInit() {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  saveCategory(): void {
    if (!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
      this.categoryForm.markAsDirty();
      return;
    }

    const updatedCategory = { ...this.category, ...this.categoryForm.value };
    console.log(updatedCategory);

    this.save.emit(updatedCategory);
  }

  closeModal() {
    this.close.emit();
  }
}
