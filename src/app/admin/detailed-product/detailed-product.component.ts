import { DetailedProductService } from '../../services/api/detailed-product.service';
import { Component, inject } from '@angular/core';
import {
  faArrowDown,
  faPlus,
  faShower,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailedProductModalComponent } from '../../components/modals/detailed-product/detailed-product.component';
import { DetailedProduct, DetailedProductResponse } from '../../core/interfaces/detailed-product';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';
import { search } from '../../utils/search';
import { PAGINATION_CONFIG } from '../../utils/pagination';
import { NotificationService } from '../../services/helpers/notification-service.service';
import { ShowDetailedProductComponent } from '../../components/modals/show-detailed-product/show-detailed-product.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [FontAwesomeModule, DetailedProductModalComponent, NgxPaginationModule, ShowDetailedProductComponent, LoaderComponent],
  templateUrl: './detailed-product.component.html',
  providers: [PaginationService, {provide: 'paginationConfig', useValue: PAGINATION_CONFIG}]
})
export class DetailedProductComponent {

  private notification = inject(NotificationService)

  detailedProducts: DetailedProduct[] = [];
  filteredDetailedProduct: DetailedProduct[] = []
  selectDetailedProduct: any = null;
  isModalOpen: boolean = false;
  isDetailModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;
  isLoadings: boolean = false;

  faArrowDown = faArrowDown;
  faEye = faEye
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;

  page: number = 1
  pageSize: number = 5

  columns: { key: keyof DetailedProduct; label: string; sortable?: boolean; type?: 'text' | 'image' }[] = [
    { key: 'id', label: 'Id', sortable: true, type: "text" },
    { key: 'product', label: 'Nombre', sortable: false, type: "text" }
  ]

  private detailedProductService = inject(DetailedProductService);

  ngOnInit(): void {
    this.loadDetailedProducts();
  }


  loadDetailedProducts() {
    this.isLoadings = true
    this.detailedProductService.getDetailedProducts().subscribe(
      (response: DetailedProductResponse) => {
        this.detailedProducts = response.data;
        this.filteredDetailedProduct = response.data
        this.isLoadings = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filteredDetailedProduct = search(this.detailedProducts, input.value || 'product.name', );
  }

  openModal(detailedProduct: any = null) {
    this.selectDetailedProduct = detailedProduct
      ? { ...detailedProduct }
      : {
          name: '',
          description: '',
          img: '',
          price: '',
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
      price: '',
    };
  }

  saveDetailedProduct(detailedProduct: DetailedProduct) {
    this.isLoading = true;
    if (this.isEditing) {
      this.detailedProductService
        .updateDetailedProduct(detailedProduct.id, detailedProduct)
        .subscribe(
          (data) => {
            this.loadDetailedProducts();
            this.closeModal();
            this.isLoading = false;
            this.notification.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error updating person', error);
            this.isLoading = false;
            this.notification.showErrorToast(
              'Hubo un error al intentar actualizar el tipo de producto.'
            );
          }
        );
    } else {
      this.detailedProductService
        .createDetailedProduct(detailedProduct)
        .subscribe(
          (data) => {
            this.loadDetailedProducts();
            this.clearForm();
            this.closeModal();
            this.isLoading = false;
            this.notification.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error adding person', error);
            this.isLoading = false;
            this.notification.showErrorToast('Hubo un error al intentar crear el producto.');
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
            this.notification.showSuccessToast(data.message);
          },
          (error) => {
            this.isLoading = false;
            this.notification.showErrorToast(
              error.error.message
            );
          }
        );
      }
    });
  }

  openShowModal(detailedProduct: DetailedProduct) {
    this.selectDetailedProduct = detailedProduct;
    this.isDetailModalOpen = true;
  }

  closeShowModal() {
    this.selectDetailedProduct = null;
    this.isDetailModalOpen = false;
  }

  
}
