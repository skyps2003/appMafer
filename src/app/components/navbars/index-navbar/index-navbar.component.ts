import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IndexDropdownComponent } from "../../dropdowns/index-dropdown/index-dropdown.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
  standalone: true,
  imports: [RouterLink, NgClass, IndexDropdownComponent, FontAwesomeModule]
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  faBars = faBars

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
