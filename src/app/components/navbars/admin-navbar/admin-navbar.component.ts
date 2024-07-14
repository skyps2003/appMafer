import { AuthService } from './../../../services/auth.service';
import { Component, inject, OnInit } from "@angular/core";
import { UserDropdownComponent } from "../../dropdowns/user-dropdown/user-dropdown.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../interfaces/user";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  standalone: true,
  imports: [UserDropdownComponent, FontAwesomeModule]
})
export class AdminNavbarComponent  {
  fasearch = faSearchPlus
  
}
