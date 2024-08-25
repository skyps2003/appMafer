import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-form',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './button-form.component.html'
})
export class ButtonFormComponent {

  faHome = faHome

  @Input() text: string = '';
  @Input() icon: IconDefinition = faHome;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() styleClass: string = '';
  @Input() disabled: boolean = false;
}
