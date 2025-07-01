import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [],
  styles: ''
})
export class CheckoutComponent {
  @Input() buyTicketsForm: FormGroup;
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
