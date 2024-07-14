import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../interfaces/category';
import { ProvidersService } from '../../../services/providers.service';
import { Provider } from '../../../interfaces/provider';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './product.component.html'
})
export class ProductModalComponent{

  public archives:any = []

  public preview: any 

  faTimes = faTimes

  @Input() product: any = {
    name: '',
    description: '',
    img: '',
    price: ''
  }
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()
  @Input() isLoading: boolean = false

  saveProduct() {
    this.save.emit(this.product)
  }

  closeModal() {
    this.close.emit()
  }

  captureImg(event: any):any
  {
    let archiveCapture = event.target.files[0]
    this.archives.push(archiveCapture)
    this.extractBase64(archiveCapture).then((imagen: any) => {
      this.preview = imagen.base
      this.product.img = imagen.base
    })
  }

  private sanitizer = inject(DomSanitizer)

  extractBase64($event: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let unsafeImg = window.URL.createObjectURL($event);
        let image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        let reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = (error) => {
          reject({
            base: null
          });
        };
      } catch (e) {
        reject(null);
      }
    });
  }

}
