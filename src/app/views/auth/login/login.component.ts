import { AuthService } from './../../../services/auth.service';
import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { NotificationService } from '../../../services/notification-service.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule]
})
export class LoginComponent{

  private notificationService = inject(NotificationService)

  password: string = ''
  email: string = ''

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (data) => {
        this.notificationService.showSuccessToast(data.message)
        setTimeout(() => {
          this.router.navigate(['admin/dashboard']);
        }, 2000);
      },
      error: (err) => {
        this.notificationService.showErrorToast(err.error.error)
      } 
    }
    
    );
  }
}
