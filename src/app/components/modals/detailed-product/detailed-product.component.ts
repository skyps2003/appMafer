import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { ProductService } from '../../../services/api/product.service';
import { ProvidersService } from '../../../services/api/providers.service';
import { CategoryService } from '../../../services/api/category.service';
import { Product, ProductResponse } from '../../../core/interfaces/product';
import { Category, CategoryResponse } from '../../../core/interfaces/category';
import { Provider, ProviderResponse } from '../../../core/interfaces/provider';
import { ButtonFormComponent } from '../../buttons/button-form/button-form.component';
import { faSave } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-detailed-product-modal',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, ValidationErrorComponent, ButtonFormComponent],
  templateUrl: './detailed-product.component.html',
})
export class DetailedProductModalComponent {
  faTimes = faTimes;
  faSave = faSave

  private productServide = inject(ProductService);
  private providerService = inject(ProvidersService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];
  providers: Provider[] = [];
  detailedProductForm: FormGroup;

  @Input() detailedProduct: any;

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  get product_idFb() {
    return this.detailedProductForm.controls['product_id'];
  }
  get category_idFb() {
    return this.detailedProductForm.controls['category_id'];
  }
  get provider_idFb() {
    return this.detailedProductForm.controls['provider_id'];
  }

  constructor(private formBuilder: FormBuilder){
    this.detailedProductForm = this.formBuilder.group({
      product_id: [null, [Validators.required]],
      category_id: [null, [Validators.required]],
      provider_id: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.loadProviders();
    if(this.detailedProduct){
      this.detailedProductForm.patchValue(this.detailedProduct)
    }
  }

  saveProduct() {
    if(!this.detailedProductForm.valid){
      this.detailedProductForm.markAllAsTouched()
      this.detailedProductForm.markAsDirty()
      return
    }

    const updateDetailedProduct = { ...this.detailedProduct, ...this.detailedProductForm.value }
    this.save.emit(updateDetailedProduct)
    console.log(updateDetailedProduct)
  }

  closeModal() {
    this.close.emit();
  }

  loadProducts() {
    this.productServide.getProducts().subscribe((response: ProductResponse) => {
      this.products = response.data;
    });
  }

  loadCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: CategoryResponse) => {
        this.categories = response.data;
      });
  }

  loadProviders() {
    this.providerService
      .getProviders()
      .subscribe((response: ProviderResponse) => {
        this.providers = response.data;
      });
  }
}
