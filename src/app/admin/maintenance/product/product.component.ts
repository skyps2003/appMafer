import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ProductModalComponent } from '../../../components/modals/product/product.component';
import { Product, ProductResponse } from '../../../core/interfaces/product';
import { ProductService } from '../../../services/api/product.service';
import { search } from '../../../utils/search';
import { DataTableComponent } from '../../../components/tables/data-table/data-table.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FontAwesomeModule, ProductModalComponent, DataTableComponent, LoaderComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  productResponse: ProductResponse | null = null;
  products: Product[] = [];
  filteredProducts: Product[] = []
  selectProduct: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;
  isLoadings: boolean = false;

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private productService = inject(ProductService);


  columns: { key: keyof Product; label: string; sortable?: boolean; type?: 'text' | 'image' }[] = [
    { key: 'id', label: 'Id', sortable: true, type: "text" },
    { key: 'img', label: 'Imagen', sortable: false, type: "image" },
    { key: 'name', label: 'Nombre', sortable: false, type: "text" },
    { key: 'description', label: 'Descripción', sortable: false, type: "text" },
    { key: 'price', label: 'Precio', sortable: false, type: "text" }
  ];

  page = 1
  pageSize = 5

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoadings = true
    this.productService.getProducts().subscribe(
      (response: ProductResponse) => {
        this.products = response.data; 
        this.filteredProducts = response.data
        this.isLoadings = false
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filteredProducts = search(this.products, input.value || '', 'description', 'name');
  }
  onPageSizeChange(): void {
    this.page = 1; 
  }

  openModal(product: Product | null = null) {
    this.selectProduct = product
      ? { ...product }
      : {
          name: '',
          description: '',
          img: '',
          price: 0
        };
    this.isEditing = !!product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectProduct = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm() {
    this.selectProduct = {
      name: '',
      description: '',
      img: '',
      price: 0
    };
  }

  saveProduct(product: Product) {
    this.isLoading = true;
    if (this.isEditing) {
      this.productService.updateProduct(product.id, product).subscribe(
        (data) => {
          this.loadProducts();
          this.closeModal();
          this.isLoading = false;
          this.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating product', error);
          this.isLoading = false;
          this.showErrorToast(error.error.message);
        }
      );
    } else {
      this.productService.createProduct(product).subscribe(
        (data) => {
          this.loadProducts();
          this.clearForm();
          this.closeModal();
          this.isLoading = false;
          this.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding product', error);
          this.isLoading = false;
          this.showErrorToast(error.error.message);
        }
      );
    }
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          (data) => {
            this.loadProducts();
            this.isLoading = false;
            this.showSuccessToast(data.message);
          },
          (error) => {
            this.isLoading = false;
            this.showErrorToast(error.error.message);
          }
        );
      }
    });
  }

  showSuccessToast(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  showErrorToast(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: message,
    });
  }
}
