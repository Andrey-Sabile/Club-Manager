import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  standalone: true,
  imports: [RouterLink],
  styles: ''
})
export class ConfirmationComponent {
  @Input() eventId: number;
}
