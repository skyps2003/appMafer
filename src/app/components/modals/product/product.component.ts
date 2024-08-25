import { Product } from './../../../core/interfaces/product';
import { OnInit, SimpleChanges } from '@angular/core';
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
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { ButtonFormComponent } from '../../buttons/button-form/button-form.component';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { NotificationService } from '../../../services/helpers/notification-service.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ValidationErrorComponent,
    ReactiveFormsModule,
    ButtonFormComponent
  ],
  templateUrl: './product.component.html',
})
export class ProductModalComponent {
  productForm: FormGroup;
  public archives: any[] = [];
  public preview: any;
  faTimes = faTimes;
  faSave = faSave

  private notification = inject(NotificationService)

  public isValidImage: boolean = true;

  @Input() product: any = {
    name: '',
    description: '',
    img: '',
    price: 0,
  };

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  get nameFb() {
    return this.productForm.controls['name'];
  }
  get descriptionFb() {
    return this.productForm.controls['description'];
  }
  get imgFb() {
    return this.productForm.controls['img'];
  }
  get priceFb() {
    return this.productForm.controls['price'];
  }

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      img: [null],
      price: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);
      if (this.product.img) {
        this.preview = this.product.img;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue) {
      this.productForm.patchValue(changes['product'].currentValue);
      if (this.product.img) {
        this.preview = this.product.img;
      }
    }
  }

  saveProduct() {
    if (!this.productForm.valid || !this.isValidImage) {
      this.productForm.markAsTouched();
      this.productForm.markAsDirty();
      if (!this.isValidImage) {
        this.notification.showErrorToast("Ingrese un archivo imagen")
      }
      return;
    }

    const updateProduct = { ...this.product, ...this.productForm.value };
    console.log(updateProduct)
    this.save.emit(updateProduct);
  }

  closeModal() {
    this.close.emit();
  }

  captureImg(event: any): void {
    let archiveCapture = event.target.files[0];
    
    if (archiveCapture && archiveCapture.type.startsWith('image/')) {
      this.isValidImage = true;
      this.archives.push(archiveCapture);
      this.extractBase64(archiveCapture).then((imagen: any) => {
        this.preview = imagen.base;
        this.product.img = imagen.base;
        this.productForm.patchValue({ img: imagen.base });
      });
    } else {
      this.isValidImage = false;
      this.preview = null;
      this.productForm.patchValue({ img: null });
      this.notification.showErrorToast('Por favor ingrese un archivo de tipo imagen')
    }
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
