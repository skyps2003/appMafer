import { NgClass } from "@angular/common";
import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";

@Component({
  selector: "app-table-dropdown",
  templateUrl: "./table-dropdown.component.html",
  standalone: true,
  imports: [NgClass]
})
export class TableDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef!: ElementRef;

  private popperInstance: any;

  ngAfterViewInit() {
    // Inicializamos Popper.js solo cuando se muestra el dropdown
  }

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
