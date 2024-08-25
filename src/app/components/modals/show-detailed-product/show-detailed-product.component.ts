import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetailedProduct } from '../../../core/interfaces/detailed-product';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-show-detailed-product',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './show-detailed-product.component.html',
  styleUrl: './show-detailed-product.component.css'
})
export class ShowDetailedProductComponent {
  @Input() detailedProduct: DetailedProduct | null = null;
  @Output() close = new EventEmitter<void>();

  faTimes = faTimes;

  closeModal() {
    this.close.emit();
  }
}
