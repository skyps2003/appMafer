import { inject } from '@angular/core';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { CategoryComponentModal } from '../../../components/modals/category/category.component';
import { Category, CategoryResponse } from '../../../core/interfaces/category';
import { CategoryService } from '../../../services/api/category.service';
import { NotificationService } from '../../../services/helpers/notification-service.service';
import { search } from '../../../utils/search';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../components/tables/data-table/data-table.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryComponentModal, FontAwesomeModule, NgxPaginationModule, FormsModule, DataTableComponent, LoaderComponent],
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectCategory: Category | null = null;
  isModalOpen = false;
  isEditing = false;
  isLoading = false;
  isLoadings = false;

  columns: { key: keyof Category; label: string; sortable?: boolean; type?: 'text' | 'image' }[] = [
    { key: 'id', label: 'Id', sortable: true, type: "text" },
    { key: 'name', label: 'Nombre', sortable: false, type: "text" },
    { key: 'description', label: 'Descripción', sortable: false, type: "text" }
  ];

  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;

  private categoryService = inject(CategoryService);
  private notification = inject(NotificationService);

  page = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoadings = true
    this.categoryService.getCategories().subscribe(
      (response: CategoryResponse) => {
        this.categories = response.data;
        this.filteredCategories = response.data;
        this.isLoadings = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filteredCategories = search(this.categories, input.value || '', 'description', 'name');
  }

  onPageSizeChange(): void {
    this.page = 1; 
  }

  openModal(category: Category | null = null): void {
    this.selectCategory = category ? { ...category } : { name: '', description: '' };
    this.isEditing = !!category;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectCategory = null;
    this.isModalOpen = false;
    this.isEditing = false;
  }

  clearForm(): void {
    this.selectCategory = { name: '', description: '' };
  }

  saveCategory(category: Category): void {
    this.isLoading = true;
    if (this.isEditing) {
      if (category.id) {
        this.categoryService.updateCategory(category.id, category).subscribe(
          (data) => {
            this.loadCategories();
            this.closeModal();
            this.isLoading = false;
            this.notification.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error updating category', error);
            this.isLoading = false;
            this.notification.showErrorToast(error.error.message);
          }
        );
      } else {
        console.error('Error: category.id is undefined');
        this.isLoading = false;
        this.notification.showErrorToast('Hubo un error al intentar actualizar la categoria.');
      }
    } else {
      this.categoryService.createCategory(category).subscribe(
        (data) => {
          this.loadCategories();
          this.clearForm();
          this.closeModal();
          this.isLoading = false;
          this.notification.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error adding category', error.message);
          this.isLoading = false;
          this.notification.showErrorToast(error.error.message);
          
        }
      );
    }
  }

  deleteCategory(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres eliminar esta categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(id).subscribe(
            (data) => {
              this.loadCategories(); 
              this.isLoading = false;
              this.notification.showSuccessToast(data.message);
            },
            (error) => {
              this.isLoading = false;
              this.notification.showErrorToast(error.error.message);
            }
          );
        }
      });
    } else {
      console.error('ID is undefined');
    }
  }
  
}
