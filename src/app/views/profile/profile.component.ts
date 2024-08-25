import { UserService } from './../../services/api/user.service';
import { Component, inject, OnInit } from "@angular/core";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../components/footers/footer/footer.component";
import { ResponseUser, User, UserResponse } from "../../core/interfaces/user";
import { AuthService } from "../../services/auth/auth.service";
import { faTimeline, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ValidationErrorComponent } from '../../components/validation-error/validation-error.component';
import { ButtonFormComponent } from '../../components/buttons/button-form/button-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationService } from '../../services/helpers/notification-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  standalone: true,
  imports: [
    AuthNavbarComponent, 
    FooterComponent, 
    ValidationErrorComponent, 
    ButtonFormComponent, 
    FontAwesomeModule, 
    ReactiveFormsModule,
     CommonModule
  ]
})
export class ProfileComponent implements OnInit {
  
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private notification = inject(NotificationService)
  faTimes = faTimes
  faSave = faSave
  isOpenModal: boolean = false

  userForm: FormGroup
  user!: User
  userU!: User
  isOpenImageModal = false;
  imageForm!: FormGroup;

  public isValidImage: boolean = true;
  public preview: string | null = null


  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      id: [{ value: null, disabled: true }], // Campo ID no editable
      name: [null, Validators.required],
      surName: [null, Validators.required],
      addres: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null] 
    });
  }

  get nameFb() { return this.userForm.controls['name'] }
  get surNameFb() { return this.userForm.controls['surName'] }
  get addresFb() { return this.userForm.controls['addres'] }
  get emailFb() { return this.userForm.controls['email'] }
  get imgFb() { return this.userForm.controls['img'] }
  get passwordFb() { return this.userForm.controls['password'] }

  loadUser() {
    this.user = this.authService.getCurrentUser();
  }

  getUser(){
    this.userService.getUser(this.user.id).subscribe(
      (response: ResponseUser) => {
        this.userU = response.data;
        if (this.userU) {
          this.userForm.patchValue(this.userU); 
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadUser();
    this.getUser();
  
    this.imageForm = this.fb.group({
      img: [null]  
    });
  }

  saveUser(): void {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
      return;
    }

    const updateUser = { ...this.userForm.getRawValue() }; 

    this.userService.updateUser(this.user.id, updateUser).subscribe(
      (response) => {
        console.log('Usuario actualizado con éxito:', response);
        this.notification.showSuccessToast("Usuario Actualizado")
        this.closeModal()
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        this.notification.showErrorToast("Erro al actualizar")
      
      }
    );
  }

  closeModal() {
    this.isOpenModal = false;
  }
  openImageModal(): void {
    this.isOpenImageModal = true;
  }

  // Método para cerrar el modal de imagen
  closeImageModal(): void {
    this.isOpenImageModal = false;
  }
  captureImg(event: any): void {
    const archiveCapture = event.target.files[0];
  
    if (archiveCapture && archiveCapture.type.startsWith('image/')) {
      this.isValidImage = true;
      this.extractBase64(archiveCapture).then((imagen: any) => {
        this.preview = imagen.base;
        this.imageForm.patchValue({ img: imagen.base });
      });
    } else {
      this.isValidImage = false;
      this.preview = null;
      this.imageForm.patchValue({ img: null });
      this.notification.showErrorToast('Por favor ingrese un archivo de tipo imagen');
    }
  }

  extractBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ base: reader.result });
      };
      reader.onerror = (error) => {
        reject({ base: null });
      };
    });
  }

  uploadImage(): void {
    const image = this.imageForm.get('img')?.value;

    if (image && this.user.id !== null) {
      this.userService.updateImage(this.user.id, image).subscribe(
        (response) => {
          console.log('Imagen actualizada correctamente:', response);
          this.notification.showSuccessToast('Imagen actualizada correctamente');
          this.closeImageModal();
        },
        (error) => {
          console.error('Error al actualizar la imagen:', error);
          this.notification.showErrorToast('Error al actualizar la imagen');
        }
      );
    } else {
      this.notification.showErrorToast('Por favor seleccione una imagen antes de subir.');
    }
  }


}
