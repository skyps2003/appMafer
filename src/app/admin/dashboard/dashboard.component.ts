import { Component, inject, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../../components/navbars/admin-navbar/admin-navbar.component';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../services/api/category.service';
import { CardComponent } from '../../components/cards/card/card.component';
import { CustomerService } from '../../services/api/customer.service';
import { ProductService } from '../../services/api/product.service';
import { ProvidersService } from '../../services/api/providers.service';
import { InventoryService } from '../../services/api/inventory.service';
import { DetailedProductService } from '../../services/api/detailed-product.service';
import { forkJoin } from 'rxjs';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminNavbarComponent, FontAwesomeModule, CardComponent, LoaderComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private customerService = inject(CustomerService)
  private productService = inject(ProductService)
  private providerService = inject(ProvidersService)
  private inventoryService = inject(InventoryService)
  private detailedProductService = inject(DetailedProductService)

  aCategory: any = '';
  aCustomer: any = '';
  aProduct: any = '';
  aProvider: any = '';
  aInventory: any = '';
  aDetailedProduct: any = '';
  isLoading: boolean = false

  ngOnInit() {
    this.isLoading = true; 
  
    forkJoin({
      category: this.categoryService.amountCategory(),
      customer: this.customerService.amountCustomer(),
      product: this.productService.amountProduct(),
      provider: this.providerService.amountProvider(),
      inventory: this.inventoryService.amountInventory(),
      detailedProduct: this.detailedProductService.amountDetailedProduct()
    }).subscribe({
      next: (results) => {
        this.aCategory = results.category;
        this.aCustomer = results.customer;
        this.aProduct = results.product;
        this.aProvider = results.provider;
        this.aInventory = results.inventory;
        this.aDetailedProduct = results.detailedProduct;
      },
      error: (err) => {
        console.error('Error loading data:', err);
      },
      complete: () => {
        this.isLoading = false; 
      }
    });
  }

  faBox = faBox;
}
