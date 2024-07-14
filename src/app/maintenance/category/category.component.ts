import { Component, inject } from '@angular/core';
import { CategoryComponentModal } from '../../components/modals/category/category.component';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Category } from '../../interfaces/category';
import { faArrowDown, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryComponentModal, FontAwesomeModule],
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  categories: Category[] = [];
  selectCategory: any = null
  isModalOpen: boolean = false
  isEditing: boolean = false
  isLoading: boolean = false
  
  faArrowDown = faArrowDown;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faTrash = faTrash;
  faTimes = faTimes;
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data
      },
      (error) => {
        console.error(error)
      }
    )
  }

  openModal(category: any = null){
    this.selectCategory = category? {...category}:{name: '', description: ''}
    this.isEditing = !!category
    this.isModalOpen = true
  }

  closeModal(){
    this.selectCategory = null
    this.isModalOpen = false
    this.isEditing = false
  }

  clearForm(){
    this.selectCategory = {name: '', description: ''}
  }

  saveCategory(category: Category)
  {
    this.isLoading = true
    if(this.isEditing){
      this.categoryService.updateCategory(category.id, category).subscribe(
        (data) => {
          this.loadCategories()
          this.closeModal()
          this.isLoading = false
          this.showSuccessToast(data.message);
        },
        (error) => {
          console.error('Error updating person', error)
          this.isLoading = false
          this.showErrorToast('Hubo un error al intentar actualizar el tipo de producto.');
        } 
      )
    }
    else{
      this.categoryService.createCategory(category).subscribe(
        (data) => {
          this.loadCategories()
          this.clearForm()
          this.closeModal()
          this.isLoading = false
          this.showSuccessToast(data.message)
        },
        (error) =>{
          console.error('Error adding person', error)
          this.isLoading = false
          this.showErrorToast('Hubo un error al intentar crear la categoria.');
        }
      )
    }
  }

  deleteCategory(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta categoria?',
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
            this.showSuccessToast(data.message);
          },
          (error) => {
            console.error('Error deleting product type', error);
            this.isLoading = false;
            this.showErrorToast('Hubo un error al intentar eliminar la categoria.');
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
      }
    });

    Toast.fire({
      icon: 'success',
      title: message
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
      }
    });

    Toast.fire({
      icon: 'error',
      title: message
    });
  }
}
