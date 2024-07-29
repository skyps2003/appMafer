import { UserService } from './../../services/api/user.service';
import { Component, inject, OnInit } from "@angular/core";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../components/footers/footer/footer.component";
import { User } from "../../core/interfaces/user";
import { AuthService } from "../../services/auth/auth.service";
import { faTimeline, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ValidationErrorComponent } from '../../components/validation-error/validation-error.component';
import { ButtonFormComponent } from '../../components/buttons/button-form/button-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  standalone: true,
  imports:[AuthNavbarComponent, FooterComponent, ValidationErrorComponent, ButtonFormComponent, FontAwesomeModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  
  private authService = inject(AuthService)
  private userService = inject(UserService)
  faTimes = faTimes
  faSave = faSave
  isOpenModal:boolean = false

  userForm: FormGroup

  user!: User


  get nameFb() { return this.userForm.controls['name'] }
get surNameFb() { return this.userForm.controls['surName'] }
get addresFb() { return this.userForm.controls['addres'] }
get emailFb() { return this.userForm.controls['email'] }
get imgFb() { return this.userForm.controls['img'] }
get passwordFb() { return this.userForm.controls['password'] }

constructor(private fb: FormBuilder){
  this.userForm = this.fb.group({
    name: [null , Validators.required],
    surName: [null , Validators.required],
    addres: [null , Validators.required],
    email: [null , Validators.required, Validators.email],
    img: [null , Validators.required]
  })
}

  loadUser(){
    this.user = this.authService.getCurrentUser()
  }

  ngOnInit(): void {
      this.loadUser()
      if(this.user){
        this.userForm.patchValue(this.user)
      }
  }

  saveUser():void{
    if(!this.userForm.valid){
      this.userForm.markAllAsTouched()
      this.userForm.markAsDirty()
      return
    }

    const updateUser = { ...this.user, ...this.userForm.value }

    this.userService.updateUser(this.user.id, updateUser);
  }


  closeModal(){
    this.isOpenModal = false
  }
  
}
