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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminNavbarComponent, FontAwesomeModule, CardComponent],
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

  amountCategory() {
    this.categoryService.amountCategory().subscribe((data) => {
      this.aCategory = data;
      console.log('Category Data:', data);
    });
  }
  amountCustomer() {
    this.customerService.amountCustomer().subscribe((data) => {
      this.aCustomer = data;
      console.log('Customer Data:', data);
    });
  }
  amountProduct() {
    this.productService.amountProduct().subscribe((data) => {
      this.aProduct = data;
      console.log('Product Data:', data);
    });
  }
  amountProvider() {
    this.providerService.amountProvider().subscribe((data) => {
      this.aProvider = data;
      console.log('Provider Data:', data);
    });
  }
  amountInventory() {
    this.inventoryService.amountInventory().subscribe((data) => {
      this.aInventory = data;
      console.log('Inventory Data:', data);
    });
  }
  amountDetailedProduct() {
    this.detailedProductService.amountDetailedProduct().subscribe((data) => {
      this.aDetailedProduct = data;
      console.log('Detailed Product Data:', data);
    });
  }

  ngOnInit() {
    this.amountCategory();
    this.amountCustomer();
    this.amountProduct();
    this.amountProvider();
    this.amountInventory();
    this.amountDetailedProduct();
  }

  faBox = faBox;
}
