import { Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LandingComponent } from './views/landing/landing.component';
import { IndexComponent } from './views/index/index.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoryComponent } from './maintenance/category/category.component';
import { ProviderComponent } from './maintenance/provider/provider.component';
import { ProductComponent } from './maintenance/product/product.component';
import { UserComponent } from './admin/user/user.component';
import { DetailedProductComponent } from './admin/detailed-product/detailed-product.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { InventoryControlComponent } from './admin/inventory-control/inventory-control.component';
import { RolComponent } from './admin/rol/rol.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { AuthGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, canActivate:[AuthGuard] },
      { path: "maintenance/category", component: CategoryComponent, canActivate:[AuthGuard] },
      { path: "maintenance/provider", component: ProviderComponent , canActivate:[AuthGuard]},
      { path: "maintenance/product", component: ProductComponent, canActivate:[AuthGuard] },
      { path: "user", component: UserComponent, canActivate:[AuthGuard] },
      { path: "rol", component: RolComponent, canActivate:[AuthGuard] },
      { path: "customer", component: CustomerComponent, canActivate:[AuthGuard] },
      { path: "detailedProduct", component: DetailedProductComponent, canActivate:[AuthGuard] },
      { path: "inventory", component: InventoryComponent, canActivate:[AuthGuard] },
      { path: "inventoryControl", component: InventoryControlComponent, canActivate:[AuthGuard] },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent, canActivate: [authenticatedGuard] },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "auth/login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];