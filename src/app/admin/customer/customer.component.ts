import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationService } from '../../services/helpers/notification-service.service';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { CustomerService } from '../../services/api/customer.service';
import Swal from 'sweetalert2';
import { CustomerComponentModal } from '../../components/modals/customer/customer.component';
import { Customer, CustomerResponse } from '../../core/interfaces/customer';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FontAwesomeModule, CustomerComponentModal,LoaderComponent],
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  selectCustomer: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;
  isLoadings: boolean = false;

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private customerService = inject(CustomerService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.isLoadings = true
    this.customerService.getCustomers().subscribe(
      (response:CustomerResponse) => {
        this.customers = response.data;
        this.filteredCustomers = response.data;
        this.isLoadings = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      this.filteredCustomers = this.customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm) ||
          customer.email.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredCustomers = [...this.customers];
    }
  }

  openModal(customer: any = null) {
    this.selectCustomer = customer
      ? { ...customer }
      : {
          name: '',
          surName: '',
          addres: '',
          email: '',
          gender: 0,
        };
    this.isEditing = !!customer;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectCustomer = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm() {
    this.selectCustomer = {
      name: '',
      surName: '',
      addres: '',
      email: '',
      gender: 0,
    };
  }

  saveCustomer(customer: Customer) {
    this.isLoading = true;
    if (this.isEditing) {
      this.customerService.updateCustomer(customer.id, customer).subscribe(
        (data) => {
          this.loadCustomers();
          this.closeModal();
          this.isLoading = false;
          this.notificationService.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating person', error);
          this.isLoading = false;
          this.notificationService.showErrorToast(
            error.error.message
          );
        }
      );
    } else {
      this.customerService.createCustomer(customer).subscribe(
        (data) => {
          this.loadCustomers();
          this.clearForm();
          this.closeModal();
          this.isLoading = false;
          this.notificationService.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding person', error);
          this.isLoading = false;
          this.notificationService.showErrorToast(
            error.error.message
          );
        }
      );
    }
  }

  deleteCustomer(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe(
          (data) => {
            this.loadCustomers();
            this.isLoading = false;
            this.notificationService.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error deleting user type', error);
            this.isLoading = false;
            this.notificationService.showErrorToast(
              error.error.message
            );
          }
        );
      }
    });
  }
}
