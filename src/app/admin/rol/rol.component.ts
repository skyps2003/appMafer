import { Component, inject } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserRoleService } from '../../services/api/user-role.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationService } from '../../services/helpers/notification-service.service';
import { UserRolComponentModal } from '../../components/modals/user-rol/user-rol.component';
import { UserRole } from '../../core/interfaces/user-role';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [FontAwesomeModule, UserRolComponentModal, LoaderComponent],
  templateUrl: './rol.component.html',
})
export class RolComponent {
  userRoles: UserRole[] = [];
  filteredUsers: UserRole[] = [];
  selectUserRole: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;
  isLoadings: boolean = false

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;

  private userRoleService = inject(UserRoleService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.loadUserRoles();
  }

  loadUserRoles() {
    this.isLoadings = true
    this.userRoleService.getUserRoles().subscribe(
      (data) => {
        this.userRoles = data;
        this.isLoadings = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // onSearch(searchTerm: string) {
  //   searchTerm = searchTerm.toLowerCase();

  //   if (searchTerm) {
  //     this.filteredUsers = this.userRoles.filter(user =>
  //       user.name.toLowerCase().includes(searchTerm) ||
  //       user.surName.toLowerCase().includes(searchTerm) ||
  //       user.email.toLowerCase().includes(searchTerm)
  //     );
  //   } else {
  //     this.filteredUsers = [...this.users];
  //   }
  // }

  openModal(user: any = null) {
    this.selectUserRole = user ? { ...user } : {};
    this.isEditing = !!user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectUserRole = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm() {
    this.selectUserRole = {};
  }

  saveUserRole(userRole: UserRole) {
    this.isLoading = true;
    if (this.isEditing) {
      this.userRoleService.updateUserRole(userRole.id, userRole).subscribe(
        (data) => {
          this.loadUserRoles();
          this.closeModal();
          this.isLoading = false;
          this.notificationService.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating person', error.error.message);
          this.isLoading = false;
          this.notificationService.showErrorToast(error.message);
        }
      );
    } else {
      this.userRoleService.createUserRole(userRole).subscribe(
        (data) => {
          this.loadUserRoles();
          this.clearForm();
          this.closeModal();
          this.isLoading = false;
          this.notificationService.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding person', error.error.message);
          this.isLoading = false;
          this.notificationService.showErrorToast(error.error.message);
        }
      );
    }
  }

  deleteUser(id: number) {
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
        this.userRoleService.deleteUserRole(id).subscribe(
          (data) => {
            this.loadUserRoles();
            this.isLoading = false;
            this.notificationService.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error deleting user type', error);
            this.isLoading = false;
            this.notificationService.showErrorToast(
              'Hubo un error al intentar eliminar al usuario.'
            );
          }
        );
      }
    });
  }

  udpateRole(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cambiar el estado del usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRoleService.updateRole(id).subscribe(
          (data) => {
            this.loadUserRoles();
            this.isLoading = false;
            this.notificationService.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error deleting user type', error);
            this.isLoading = false;
            this.notificationService.showErrorToast(
              'Hubo un error al intentar eliminar al usuario.'
            );
          }
        );
      }
    });
  }
}
