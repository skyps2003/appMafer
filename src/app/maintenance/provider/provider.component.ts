import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Provider } from '../../interfaces/provider';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ProvidersService } from '../../services/providers.service';
import Swal from 'sweetalert2';
import { ProviderComponentModal } from '../../components/modals/provider/provider.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [FontAwesomeModule, ProviderComponentModal, CommonModule, FormsModule],
  templateUrl: './provider.component.html',
})
export class ProviderComponent {
  rucNumber: string = '';

  providers: Provider[] = [];
  selectProvider: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private providerService = inject(ProvidersService);

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders() {
    this.providerService.getProviders().subscribe(
      (data) => {
        this.providers = data;
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
          this.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating person', error);
          this.isLoading = false;
          this.showErrorToast(
            'Hubo un error al intentar actualizar el proveedor.'
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
          this.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding person', error);
          this.isLoading = false;
          this.showErrorToast('Hubo un error al intentar crear el proveedor.');
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
            this.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error deleting provider', error);
            this.isLoading = false;
            this.showErrorToast(
              'Hubo un error al intentar eliminar el proveedor.'
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

  consultarRUC() {
    this.providerService.getProviderRUC(this.rucNumber).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        this.selectProvider = {
          ruc: this.rucNumber,
          name: response.razonSocial,
          address: response.direccion,
          phone: '',
          email: ''
        };
        this.openModal(this.selectProvider); 
      },
      error => {
        console.error('Error al consultar el RUC:', error);
        const errorMessage = error.error?.message || 'Error al consultar el RUC';
        this.showErrorToast(errorMessage);
      }
    );
  }
}
