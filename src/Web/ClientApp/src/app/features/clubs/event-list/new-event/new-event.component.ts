import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  CreateEventCommand,
  CreateTicketTypeCommand,
  EventsClient, NewTicketTypeDto,
  TicketTypeDto,
  TicketTypesClient
} from "../../../../web-api-client";

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './new-event.component.html',
  styles: ``
})

export class NewEventComponent implements OnInit{
  public ticketTypes: TicketTypeDto[] = [];
  public eventId: number;
  public clubId: number;

  public newEventForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    location: new FormControl('', [
      Validators.required,
    ]),
    when: new FormControl(null, [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
  });
  
  public ticketTypeForm = new FormGroup({
    name: new FormControl('',[
      Validators.required
    ]),
    price: new FormControl(null,[
      Validators.required,
    ]),
    quantity: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(
    private eventsClient: EventsClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.clubId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  createEvent(): void {
    const newEvent = {
      clubId: this.clubId,
      name: this.newEventForm.controls.name.value,
      when: this.newEventForm.controls.when.value,
      location: this.newEventForm.controls.location.value,
      description: this.newEventForm.controls.description.value,
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
