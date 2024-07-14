import { NgClass } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { createPopper } from "@popperjs/core";

@Component({
  selector: "app-index-dropdown",
  templateUrl: "./index-dropdown.component.html",
  standalone: true,
  imports: [NgClass, RouterLink]
})
export class IndexDropdownComponent implements OnInit {
  dropdownPopoverShow = false;

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef!: ElementRef;

  ngOnInit() {}

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;

    if (this.dropdownPopoverShow) {
      this.createPopper();
    }
  }

  createPopper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
}
