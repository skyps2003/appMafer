import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-provider-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './provider.component.html'
})
export class ProviderComponentModal {
  faTimes = faTimes

  @Input() provider: any = { ruc: '', name: '', phone: '', email: '', address: '',reason: '' }
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()
  @Input() isLoading: boolean = false

  saveProvider() {
    this.save.emit(this.provider)
  }

  closeModal() {
    this.close.emit()
  }
}
