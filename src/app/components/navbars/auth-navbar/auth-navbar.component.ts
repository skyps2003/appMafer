import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PagesDropdownComponent } from "../../dropdowns/pages-dropdown/pages-dropdown.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
  standalone: true,
  imports: [RouterLink, NgClass, PagesDropdownComponent, FontAwesomeModule],

})
export class AuthNavbarComponent implements OnInit {

  faBars= faBars

  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
