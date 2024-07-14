import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../services/product.service';
import { ProvidersService } from '../../../services/providers.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../interfaces/product';
import { Category } from '../../../interfaces/category';
import { Provider } from '../../../interfaces/provider';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';

@Component({
  selector: 'app-detailed-product-modal',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './detailed-product.component.html'
})
export class DetailedProductModalComponent {
  
  faTimes = faTimes

  private productServide = inject(ProductService)
  private providerService =inject(ProvidersService)
  private categoryService =inject(CategoryService)
  private fb = inject(FormBuilder)


  products: Product[] = []
  categories: Category[] = []
  providers: Provider[] = []
  detailedProductForm!: FormGroup

  @Input() detailedProduct: any;

  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()
  @Input() isLoading: boolean = false

  ngOnInit(){
    this.loadCategories()
    this.loadProducts()
    this.loadProviders()

    this.detailedProductForm = this.fb.group({
      product_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      provider_id: ['', [Validators.required]]
    })

    if(this.detailedProduct){
      this.detailedProductForm.patchValue(this.detailedProduct)
    }
  }

  saveProduct() {
    if(this.detailedProductForm.valid){
      this.save.emit(this.detailedProductForm.value)
    }else{
      this.detailedProduct.markAllAsTouched()
    }
  }

  closeModal() {
    this.close.emit()
  }

  loadProducts(){
    this.productServide.getProducts().subscribe(
      (data) => {
        this.products = data
      }
    )
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data
      }
    )
  }

  loadProviders() {
    this.providerService.getProviders().subscribe(
      (data) => {
        this.providers = data
      }
    )
  }


}
