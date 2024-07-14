import { DetailedProductService } from './../../services/detailed-product.service';
import { Component, inject } from '@angular/core';
import { DetailedProduct } from '../../interfaces/detailed-product';
import { faArrowDown, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailedProductModalComponent } from '../../components/modals/detailed-product/detailed-product.component';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [FontAwesomeModule, DetailedProductModalComponent],
  templateUrl: './detailed-product.component.html'
})
export class DetailedProductComponent {
  detailedProducts: DetailedProduct[] = [];
  selectDetailedProduct: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private detailedProductService = inject(DetailedProductService);

  ngOnInit(): void {
    this.loadDetailedProducts();
  }

  loadDetailedProducts() {
    this.detailedProductService.getDetailedProducts().subscribe(
      (data) => {
        this.detailedProducts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModal(detailedProduct: any = null) {
    this.selectDetailedProduct = detailedProduct
      ? { ...detailedProduct }
      : {
          name: '',
          description: '',
          img: '',
          price: ''
        };
    this.isEditing = !!detailedProduct;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectDetailedProduct = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm() {
    this.selectDetailedProduct = {
      name: '',
      description: '',
      img: '',
      price: ''
    };
  }

  saveDetailedProduct(detailedProduct: DetailedProduct) {
    this.isLoading = true;
    if (this.isEditing) {
      this.detailedProductService.updateDetailedProduct(detailedProduct.id, detailedProduct).subscribe(
        (data) => {
          this.loadDetailedProducts();
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
      this.detailedProductService.createDetailedProduct(detailedProduct).subscribe(
        (data) => {
          this.loadDetailedProducts();
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

  deleteDetailedProduct(id: number) {
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
        this.detailedProductService.deleteDetailedProduct(id).subscribe(
          (data) => {
            this.loadDetailedProducts();
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
