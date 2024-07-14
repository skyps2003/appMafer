import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { FooterSmallComponent } from "../../components/footers/footer-small/footer-small.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  standalone: true,
  imports: [RouterOutlet, AuthNavbarComponent, FooterSmallComponent]
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
