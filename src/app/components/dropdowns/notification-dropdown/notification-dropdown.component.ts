import { NgClass } from "@angular/common";
import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";

@Component({
  selector: "app-notification-dropdown",
  standalone: true,
  templateUrl: "./notification-dropdown.component.html",
  imports: [NgClass]
})
export class NotificationDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef!: ElementRef;

  private popperInstance: any;

  ngAfterViewInit() {
    this.popperInstance = createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;

    if (this.dropdownPopoverShow) {
      this.popoverDropdownRef.nativeElement.style.display = 'block';
    } else {
      this.popperInstance.destroy();
      this.popoverDropdownRef.nativeElement.style.display = 'none';
    }
  }
}
