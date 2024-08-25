import { faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationDropdownComponent } from '../dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../dropdowns/user-dropdown/user-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAllergies,
  faBars,
  faBox,
  faBoxArchive,
  faBoxesStacked,
  faChevronDown,
  faChevronUp,
  faHouse,
  faInfoCircle,
  faMapMarked,
  faNavicon,
  faTable,
  faTableCells,
  faTimes,
  faTools,
  faTruck,
  faTv,
  faUserCircle,
  faUserFriends,
  faUsers,
  faUserShield,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { CompanyService } from '../../services/api/company.service';
import { Company, CompanyResponse } from '../../core/interfaces/company';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    FontAwesomeModule,
    NotificationDropdownComponent,
    UserDropdownComponent,
    RouterLinkActive,
  ],
})
export class SidebarComponent implements OnInit {
  private companyService = inject(CompanyService);
  company: Company | null = null;

  faBars = faBars;
  fatv = faTv;
  fatools = faTools;
  fatable = faTable;
  famapmarket = faMapMarked;
  faClipboard = faClipboard;
  faNewspaper = faNewspaper;
  faUserCircle = faUserCircle;
  faTimes = faTimes;
  faUser = faUser;
  faBoxes = faBoxesStacked;
  faBoxArchive = faBoxArchive;
  faTable = faTableCells;
  faTruck = faTruck;
  faBox = faBox;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faInfoCircle = faInfoCircle
  faWarehouse = faWarehouse
  faUserShield = faUserShield
  faUsers = faUsers
  faUserFriends = faUserFriends

  isProductCollapsed = true;
  collapseShow = 'hidden';

  isMaintenanceCollapsed = true;
  isRolesCollapsed = true;
  isUsuariosCollapsed = true;
  isClientesCollapsed = true;

  toggleMaintenanceCollapse() {
    this.isMaintenanceCollapsed = !this.isMaintenanceCollapsed;
  }
  toggleRolesCollapse() {
    this.isRolesCollapsed = !this.isRolesCollapsed;
  }

  toggleUsuariosCollapse() {
    this.isUsuariosCollapsed = !this.isUsuariosCollapsed;
  }

  toggleClientesCollapse() {
    this.isClientesCollapsed = !this.isClientesCollapsed;
  }

  constructor() {}

  ngOnInit() {
    this.getCompany();
  }

  toggleCollapseShow(classes: string) {
    this.collapseShow =
      this.collapseShow === 'hidden'
        ? 'block bg-white m-2 py-3 px-6'
        : 'hidden';
  }
  toggleProductCollapse() { // Nueva función para el colapso de Productos
    this.isProductCollapsed = !this.isProductCollapsed;
  }

  getCompany() {
    this.companyService.getCompany(1).subscribe((response: CompanyResponse) => {
      this.company = response.data;
    });
  }
}
