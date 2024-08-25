import { FooterComponent } from './../../components/footers/footer/footer.component';
import { Component, OnInit } from "@angular/core";
import { IndexNavbarComponent } from "../../components/navbars/index-navbar/index-navbar.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  standalone: true,
  imports:[IndexNavbarComponent, RouterLink, FooterComponent]
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
