import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventDto, TicketTypeDto } from "src/app/web-api-client";

@Component({
  selector: 'app-ticket-types-selection',
  standalone: true,
  templateUrl: './ticket-types-selection.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class TicketTypesSelectionComponent {
  @Input() event: EventDto;
  @Input() ticketTypes: TicketTypeDto[] = [];
  @Input() buyTicketsForm: FormGroup;
  @Input() getTotalPrice: () => number;
  @Output() next = new EventEmitter<void>();
}
