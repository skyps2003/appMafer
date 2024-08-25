import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { ButtonFormComponent } from '../../buttons/button-form/button-form.component';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { NotificationService } from '../../../services/helpers/notification-service.service';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [FontAwesomeModule,  ButtonFormComponent, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './user.component.html',
})
export class UserComponentModal {
  private sanitizer = inject(DomSanitizer);

  public archives: any[] = [];
  public preview: any;
  public userForm!: FormGroup;
  private notification = inject(NotificationService)

  public isValidImage: boolean = true;

  faTimes = faTimes;
  faSave = faSave

  @Input() user: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  get nameFb() {
    return this.userForm.controls['name'];
  }
  get surNameFb() {
    return this.userForm.controls['surName'];
  }
  get addresFb() {
    return this.userForm.controls['addres'];
  }
  get emailFb() {
    return this.userForm.controls['email'];
  }
  get passwordFb() {
    return this.userForm.controls['password'];
  }
  get password_confirmationFb() {
    return this.userForm.controls['password_confirmation'];
  }
  get genderFb() {
    return this.userForm.controls['gender'];
  }
  get imgFb() {
    return this.userForm.controls['img'];
  }

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surName: ['', [Validators.required, Validators.minLength(3)]],
      addres: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      password_confirmation: [''],
      gender: [0, [Validators.required]],
      img: [''],
    })
    this.setPasswordValidators();
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
      this.clearPasswordValidators();
    }
  }

  ngOnChanges(changes: SimpleChanges ) {
    if (changes['user'] && changes['user'].currentValue) {
      this.userForm.patchValue(changes['user'].currentValue);
      if (this.user.img) {
        this.preview = this.user.img;
      }
      this.clearPasswordValidators();
    }
  }

  setPasswordValidators() {
    if (!this.user) {
      this.userForm.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.controls['password_confirmation'].setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.clearPasswordValidators();
    }
    this.userForm.controls['password'].updateValueAndValidity();
    this.userForm.controls['password_confirmation'].updateValueAndValidity();
  }

  clearPasswordValidators() {
    this.userForm.controls['password'].clearValidators();
    this.userForm.controls['password_confirmation'].clearValidators();
    this.userForm.controls['password'].updateValueAndValidity();
    this.userForm.controls['password_confirmation'].updateValueAndValidity();
  }

  saveUser() {
    if(!this.userForm.valid){
      this.userForm.markAllAsTouched()
      this.userForm.markAsDirty()
      return
    }

    const updatedUser = { ...this.user, ...this.userForm.value }

    this.save.emit(updatedUser)

  }

  closeModal() {
    this.close.emit();
  }

  captureImg(event: any): void {
    let archiveCapture = event.target.files[0];
    
    if (archiveCapture && archiveCapture.type.startsWith('image/')) {
      this.isValidImage = true;
      this.archives.push(archiveCapture);
      this.extractBase64(archiveCapture).then((imagen: any) => {
        this.preview = imagen.base;
        this.user.img = imagen.base;
        this.userForm.patchValue({ img: imagen.base });
      });
    } else {
      this.isValidImage = false;
      this.preview = null;
      this.userForm.patchValue({ img: null });
      this.notification.showErrorToast('Por favor ingrese un archivo de tipo imagen')
    }
  }

  extractBase64($event: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let unsafeImg = window.URL.createObjectURL($event);
        let image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        let reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = (error) => {
          reject({
            base: null
          });
        };
      } catch (e) {
        reject(null);
      }
    });
  }
}
