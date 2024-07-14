import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ProductService } from '../../services/product.service';
import { ProductModalComponent } from '../../components/modals/product/product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FontAwesomeModule, ProductModalComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  products: Product[] = [];
  selectProduct: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModal(product: any = null) {
    this.selectProduct = product
      ? { ...product }
      : {
          name: '',
          description: '',
          img: '',
          price: ''
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
      price: ''
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
          console.error('Error updating person', error);
          this.isLoading = false;
          this.showErrorToast(
            'Hubo un error al intentar actualizar el tipo de producto.'
          );
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
          console.error('Error adding person', error);
          this.isLoading = false;
          this.showErrorToast('Hubo un error al intentar crear el producto.');
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
            console.error('Error deleting product type', error);
            this.isLoading = false;
            this.showErrorToast(
              'Hubo un error al intentar eliminar el producto.'
            );
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
