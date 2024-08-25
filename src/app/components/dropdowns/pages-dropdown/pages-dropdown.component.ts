import { NgClass } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { createPopper } from "@popperjs/core";

@Component({
  selector: "app-pages-dropdown",
  templateUrl: "./pages-dropdown.component.html",
  standalone: true,
  imports: [NgClass, RouterLink]
})
export class PagesDropdownComponent implements OnInit {
  dropdownPopoverShow = false;

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef!: ElementRef;

  private popperInstance: any;

  ngOnInit() {}

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;

    if (this.dropdownPopoverShow) {
      this.showDropdown();
    } else {
      this.hideDropdown();
    }
  }

  showDropdown() {
    this.popperInstance = createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
    this.popoverDropdownRef.nativeElement.style.display = 'block';
  }

  hideDropdown() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
    this.popoverDropdownRef.nativeElement.style.display = 'none';
  }
}
