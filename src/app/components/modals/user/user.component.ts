import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [ FontAwesomeModule, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './user.component.html'
})
export class UserComponentModal {
  
  private sanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);

  public archives: any[] = [];
  public preview: any;
  public userForm!: FormGroup;

  faTimes = faTimes;

  @Input() user: any; 
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surName: ['', [Validators.required, Validators.minLength(3)]],
      addres: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      gender: [0, [Validators.required]],
      img: ['']
    });

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  saveUser() {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.close.emit();
  }

  captureImg(event: any): any {
    let archiveCapture = event.target.files[0];
    this.archives.push(archiveCapture);
    this.extractBase64(archiveCapture).then((imagen: any) => {
      this.preview = imagen.base;
      this.userForm.patchValue({ img: imagen.base });
    });
  }

  extractBase64($event: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let unsafeImg = window.URL.createObjectURL($event);
        let image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        let reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = (error) => {
          reject({
            base: null
          });
        };
      } catch (e) {
        reject(null);
      }
    });
  }
}
