import { FooterComponent } from './../../components/footers/footer/footer.component';
import { Component, OnInit } from "@angular/core";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  standalone: true,
  imports: [AuthNavbarComponent, RouterLink, FooterComponent]
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
