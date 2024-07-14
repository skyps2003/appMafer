import { faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NotificationDropdownComponent } from "../dropdowns/notification-dropdown/notification-dropdown.component";
import { UserDropdownComponent } from "../dropdowns/user-dropdown/user-dropdown.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAllergies, faBars, faBox, faBoxArchive, faBoxesStacked, faChevronDown, faChevronUp, faMapMarked, faNavicon, faTable, faTableCells, faTimes, faTools, faTruck, faTv, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: true,
  imports: [RouterLink, NgClass, FontAwesomeModule, NotificationDropdownComponent, UserDropdownComponent, RouterLinkActive]
})
export class SidebarComponent implements OnInit {

  faBars = faBars;
  fatv = faTv;
  fatools = faTools;
  fatable = faTable;
  famapmarket = faMapMarked;
  faClipboard = faClipboard;
  faNewspaper = faNewspaper;
  faUserCircle = faUserCircle;
  faTimes = faTimes
  faUser = faUser
  faBoxes= faBoxesStacked
  faBoxArchive = faBoxArchive
  faTable = faTableCells
  faTruck = faTruck
  faBox = faBox
  faChevronDown = faChevronDown
  faChevronUp = faChevronUp

  collapseShow = "hidden";

  isMaintenanceCollapsed = true;

  toggleMaintenanceCollapse() {
    this.isMaintenanceCollapsed = !this.isMaintenanceCollapsed;
  }

  constructor() {}

  ngOnInit() {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = this.collapseShow === "hidden" ? "block bg-white m-2 py-3 px-6" : "hidden";
  }
}
