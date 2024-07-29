import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import { RolService } from '../../../services/api/rol.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ValidationErrorComponent } from '../../validation-error/validation-error.component';
import { User, UserResponse } from '../../../core/interfaces/user';
import { Rol, RolResponse } from '../../../core/interfaces/rol';

@Component({
  selector: 'app-user-rol-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, ValidationErrorComponent],
  templateUrl: './user-rol.component.html',
})
export class UserRolComponentModal {
  @Input() userRole: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  private userService = inject(UserService);
  private rolService = inject(RolService);
  private fb = inject(FormBuilder);

  public userRolForm!: FormGroup;

  users: User[] = [];
  rols: Rol[] = [];

  faTimes = faTimes;

  ngOnInit() {
    this.userRolForm = this.fb.group({
      user_id: ['', [Validators.required]],
      rol_id: ['', [Validators.required]],
    });
    if (this.userRole) {
      this.userRolForm.patchValue(this.userRole);
    }

    this.loadRols();
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe((response: UserResponse) => {
      this.users = response.data;
    });
  }
  loadRols() {
    this.rolService.getRols().subscribe((response: RolResponse) => {
      this.rols = response.data;
    });
  }
  saveUserRole() {
    if (this.userRolForm.valid) {
      this.save.emit(this.userRolForm.value);
    } else {
      this.userRolForm.markAllAsTouched();
    }
  }
  closeModal() {
    this.close.emit();
  }
}
