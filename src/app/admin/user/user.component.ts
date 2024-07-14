import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import {
  faArrowDown,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponentModal } from '../../components/modals/user/user.component';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FontAwesomeModule, UserComponentModal],
  templateUrl: './user.component.html',
})
export class UserComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectUser: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = false;

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private userService = inject(UserService);
  private notificationService = inject(NotificationService)

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.surName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  openModal(user: any = null) {
    this.selectUser = user
      ? { ...user }
      : {
          name: '',
          surName: '',
          addres: '',
          email: '',
          gender: 0
        };
    this.isEditing = !!user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectUser = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm() {
    this.selectUser = {
      name: '',
      surName: '',
      addres: '',
      email: '',
      gender: 0
    };
  }

  saveUser(user: User) {
    this.isLoading = true;
    if (this.isEditing) {
      this.userService.updateUser(user.id, user).subscribe(
        (data) => {
          this.loadUsers();
          this.closeModal();
          this.isLoading = false;
          this.notificationService.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating person', error);
          this.isLoading = false;
          this.notificationService.showErrorToast(
            'Hubo un error al intentar actualizar el usuario.'
          );
        }
      );
    } else {
      this.userService.createUser(user).subscribe(
        (data) => {
          this.loadUsers();
          this.clearForm();
          this.closeModal();
          this.isLoading = false;
          this.notificationService.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding person', error);
          this.isLoading = false;
          this.notificationService.showErrorToast('Hubo un error al intentar crear el usuario.');
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
        this.userService.deleteUser(id).subscribe(
          (data) => {
            this.loadUsers();
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