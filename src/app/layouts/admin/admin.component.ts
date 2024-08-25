import { Component, OnInit } from "@angular/core";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { AdminNavbarComponent } from "../../components/navbars/admin-navbar/admin-navbar.component";
import { HeaderStatsComponent } from "../../components/headers/header-stats/header-stats.component";
import { RouterOutlet } from "@angular/router";
import { FooterAdminComponent } from "../../components/footers/footer-admin/footer-admin.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  standalone: true,
  imports: [SidebarComponent, AdminNavbarComponent, HeaderStatsComponent, RouterOutlet, FooterAdminComponent]
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
