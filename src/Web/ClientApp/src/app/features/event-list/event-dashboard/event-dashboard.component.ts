import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {
  CreateTicketTypeCommand,
  EventDto,
  EventsClient, NewTicketTypeDto,
  SoldTicketsDto,
  TicketsClient,
  TicketTypeDto,
  TicketTypesClient, UpdateEventCommand
} from "../../../web-api-client";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './event-dashboard.component.html',
  styles: ``
})
export class EventDashboardComponent implements OnInit{
  public event: EventDto;
  public ticketTypes: TicketTypeDto[] = [];
  public eventId: number;
  public ticketStats: SoldTicketsDto;

  public editEventForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    location: new FormControl(''),
    when: new FormControl(),
    description: new FormControl(''),
  });
  public newTicketTypeForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(),
    quantity: new FormControl()
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsClient: EventsClient,
    private ticketTypesClient: TicketTypesClient,
    private ticketsClient: TicketsClient,
  ) {}

  ngOnInit() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEvent(this.eventId);
    this.getTicketTypes(this.eventId);
    this.getTicketStats(this.eventId);
  }

  getEvent(id: number): void {
    this.eventsClient.getEventById(id).subscribe({
      next: result => this.event = result,
      error: err => console.log(err),
    });
  }

  getTicketTypes(id: number): void {
    this.ticketTypesClient.getTicketTypesByEventId(id).subscribe({
      next: result => this.ticketTypes = result,
      error: err => console.log(err),
    });
  }

  getTicketStats(id: number): void {
    this.ticketsClient.getTicketsSold(id).subscribe({
      next: result => this.ticketStats = result,
      error: err => console.log(err),
    });
  }

  editEvent(): void {
    this.editEventForm.controls.id.setValue(this.eventId);
    this.editEventForm.controls.name.setValue(this.event.name);
    this.editEventForm.controls.location.setValue(this.event.location);
    this.editEventForm.controls.when.setValue(this.event.when);
    this.editEventForm.controls.description.setValue(this.event.description);
  }

  saveChangesToEvent(): void {
    const updatedEvent = {
      id: this.editEventForm.controls.id.value,
      name: this.editEventForm.controls.name.value,
      location: this.editEventForm.controls.location.value,
      when: this.editEventForm.controls.when.value,
    } as UpdateEventCommand

    this.eventsClient.updateEvent(this.eventId, updatedEvent).subscribe({
      next: value => this.editEventForm.reset(),
      error: err => console.log(err),
    });

    this.event.name = updatedEvent.name;
    this.event.location = updatedEvent.location;
    this.event.when = updatedEvent.when;
  }

  addTicketType(): void {
    const newTicketType = {
      name: this.newTicketTypeForm.controls.name.value,
      price: this.newTicketTypeForm.controls.price.value,
      quantity: this.newTicketTypeForm.controls.quantity.value
    } as NewTicketTypeDto

    const newTicketTypes: NewTicketTypeDto[] = [];
    newTicketTypes.push(newTicketType);

    const createTicketTypeCommand = {
      eventId: this.eventId,
      ticketTypes: newTicketTypes,
    } as CreateTicketTypeCommand

    this.ticketTypesClient.createTicketType(createTicketTypeCommand).subscribe({
      next: value => {
        this.ticketTypes.push(newTicketType);
        this.newTicketTypeForm.reset();
        this.getTicketStats(this.eventId);
      },
      error: err => console.log(err),
    });
  }
}
