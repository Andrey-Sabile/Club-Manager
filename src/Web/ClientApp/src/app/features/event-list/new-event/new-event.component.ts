import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Router } from "@angular/router";
import {
  CreateEventCommand,
  CreateTicketTypeCommand,
  EventsClient, NewTicketTypeDto,
  TicketTypeDto,
  TicketTypesClient
} from "../../../web-api-client";

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-event.component.html',
  styles: ``
})
export class NewEventComponent {
  public newEventForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    when: new FormControl()
  });
  public ticketTypeForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(),
    quantity: new FormControl()
  });
  public ticketTypes: TicketTypeDto[] = [];
  public eventId: Number;

  constructor(
    private eventsClient: EventsClient,
    private router: Router,
    private ticketTypesClient: TicketTypesClient,
  ) {}

  createEvent(): void {
    const newEvent = {
      name: this.newEventForm.controls.name.value,
      when: this.newEventForm.controls.when.value,
      location: this.newEventForm.controls.location.value,
      ticketTypes: this.ticketTypes,
    } as CreateEventCommand

    this.eventsClient.createEvents(newEvent).subscribe({
      next: result => {
        this.newEventForm.reset();
        this.router.navigateByUrl('events/' +  result);
      }
    })
  }

  addTicketType(): void {
    const newTicketType = {
      name: this.ticketTypeForm.controls.name.value,
      price: this.ticketTypeForm.controls.price.value,
      quantity: this.ticketTypeForm.controls.quantity.value
    } as NewTicketTypeDto
    this.ticketTypes.push(newTicketType);

    this.ticketTypeForm.reset();
  }
}
