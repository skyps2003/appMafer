import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderComponentModal } from '../../../components/modals/provider/provider.component';
import { Provider, ProviderResponse } from '../../../core/interfaces/provider';
import { ProvidersService } from '../../../services/api/providers.service';
import { DataTableComponent } from '../../../components/tables/data-table/data-table.component';
import { search } from '../../../utils/search';
import { NotificationService } from '../../../services/helpers/notification-service.service';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [FontAwesomeModule, ProviderComponentModal, CommonModule, FormsModule, DataTableComponent, LoaderComponent],
  templateUrl: './provider.component.html',
})
export class ProviderComponent {
  
  rucNumber: string = '';
  providers: Provider[] = [];
  selectProvider: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;
  isLoadings: boolean = false;
  filteredProviders: Provider[] = []

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private providerService = inject(ProvidersService);
  private notification = inject(NotificationService)

  columns: { key: keyof Provider; label: string; sortable?: boolean; type?: 'text' | 'image' }[] = [
    { key: 'id', label: 'Id', sortable: true, type: 'text' },
    { key: 'name', label: 'Nombre', sortable: false, type: 'text' },
    { key: 'ruc', label: 'Ruc', sortable: false, type: 'text' },
    { key: 'reason', label: 'Razon', sortable: false, type: 'text' },
    { key: 'phone', label: 'Telefono', sortable: false, type: 'text' }
];

  page = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadProviders();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filteredProviders = search(this.providers, input.value || '', 'name', 'ruc');
  }

  onPageSizeChange(): void {
    this.page = 1; 
  }

  loadProviders() {
    this.isLoadings = true
    this.providerService.getProviders().subscribe(
      (response: ProviderResponse) => {
        this.providers = response.data
        this.filteredProviders = response.data
        this.isLoadings = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModal(provider: any = null) {
    this.selectProvider = provider
      ? { ...provider }
      : {
          ruc: '', name: '', phone: '', email: '', address: '',reason: ''
        };
    this.isEditing = !!provider;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectProvider = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm() {
    this.selectProvider = {
      ruc: '', name: '', phone: '', email: '', address: '',reason: ''
    };
  }

  saveProvider(provider: Provider) {
    this.isLoading = true;
    if (this.isEditing) {
      this.providerService.updateProvider(provider.id, provider).subscribe(
        (data) => {
          this.loadProviders();
          this.closeModal();
          this.isLoading = false;
          this.notification.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating person', error);
          this.isLoading = false;
          this.notification.showErrorToast(
            error.message
          );
        }
      );
    } else {
      this.providerService.createProvider(provider).subscribe(
        (data) => {
          this.loadProviders();
          this.clearForm();
          this.closeModal();
          this.isLoading = false;
          this.notification.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding person', error.error.message);
          this.isLoading = false;
          
          this.notification.showErrorToast(error.error.message);
        }
      );
    }
  }

  deleteProvider(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este proveedor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteProvider(id).subscribe(
          (data) => {
            this.loadProviders();
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
}
