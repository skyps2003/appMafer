import { AuthService } from './../../../services/auth.service';
import { NgClass } from "@angular/common";
import { Component, AfterViewInit, ViewChild, ElementRef, inject } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { User } from '../../../interfaces/user';

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  standalone: true,
  imports: [NgClass]
})
export class UserDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef!: ElementRef;

  private popperInstance: any;
  private authService = inject(AuthService)

  logout(){
    return this.authService.logout()
  }

  user!: User

  loadUser(){
    this.user = this.authService.getCurrentUser()
  }

  ngOnInit(): void {
    this.loadUser()
  }

  

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
