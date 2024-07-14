import { Component, inject } from '@angular/core';
import { AdminNavbarComponent } from '../../components/navbars/admin-navbar/admin-navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminNavbarComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  private authService = inject(AuthService)

  logout(){
    this.authService.logout()
  }

}
