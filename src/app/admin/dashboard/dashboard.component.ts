import { Component, inject } from '@angular/core';
import { AdminNavbarComponent } from '../../components/navbars/admin-navbar/admin-navbar.component';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../services/api/category.service';
import { CardComponent } from '../../components/cards/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminNavbarComponent, FontAwesomeModule, CardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private categoryService = inject(CategoryService);

  aCategory: any = '';

  amountCategory() {
    this.categoryService.amountCategory().subscribe((data) => {
      this.aCategory = data;
    });
  }
  ngOnInit() {
    this.amountCategory();
  }

  faBox = faBox;
}
