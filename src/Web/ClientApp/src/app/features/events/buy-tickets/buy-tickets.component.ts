import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { CreateTicketCommand, EventDto, EventsClient, TicketTypeDto, TicketTypeQuantityDto, TicketTypesClient, TicketsClient } from "src/app/web-api-client";
import { ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketTypesSelectionComponent } from './ticket-types-selection.component';
import { CheckoutComponent } from './checkout.component';
import { ConfirmationComponent } from './confirmation.component';

// Add enum for view state
enum BuyTicketsViewState {
  TicketTypesSelection,
  Checkout,
  Confirmation
}

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TicketTypesSelectionComponent, CheckoutComponent, ConfirmationComponent],
  templateUrl: './buy-tickets.component.html',
  styles: ``
})
export class BuyTicketsComponent implements OnInit {
  public eventId: number;
  public event: EventDto;
  public ticketTypes: TicketTypeDto[] = [];

  // Use a single view state
  viewState = BuyTicketsViewState.TicketTypesSelection;
  BuyTicketsViewState = BuyTicketsViewState; // Expose enum to template

  public buyTicketsForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [
      Validators.email,
      Validators.required,
    ]],
    ticketTypeQuantity: this.formBuilder.array([], Validators.required),
  });

  get ticketTypeQuantity() {
    return this.buyTicketsForm.get('ticketTypeQuantity') as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsClient: EventsClient,
    private ticketTypesClient: TicketTypesClient,
    private formBuilder: FormBuilder,
    private ticketsClient: TicketsClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEvent(this.eventId);
    this.getTicketTypes(this.eventId);
    this.viewState = BuyTicketsViewState.TicketTypesSelection;
  }

  getEvent(id: number): void {
    this.eventsClient.getEventById(id).subscribe({
      next: result => this.event = result,
      error: err => console.log(err),
    });
  }

  getTicketTypes(id: number): void {
    this.ticketTypesClient.getTicketTypesByEventId(id).subscribe({
      next: result => {
        this.ticketTypes = result;
        this.addTicketTypeAndQuantityControls();
      },
      error: err => console.log(err),
    });
  }

  addTicketTypeAndQuantityControls(): void {
    this.ticketTypes.forEach(ticketType => {
      this.ticketTypeQuantity.push(
        this.formBuilder.group({
          id: [ticketType.id, Validators.required],
          quantity: [0, [
            Validators.required,
          ]],
        }));
    })
  };

  getTotalPrice(): number {
    let totalPrice = 0;
    const ticketTypeQuantities = this.buyTicketsForm.value.ticketTypeQuantity;
    ticketTypeQuantities.forEach(ticketType => {
      const ticketTypeId = ticketType['id'];
      const ticketTypePrice = this.ticketTypes.find(t => t.id === ticketTypeId)?.price || 0;
      const ticketQuantity = Number(ticketType['quantity']);
      totalPrice += ticketTypePrice * ticketQuantity;
    });
    return totalPrice;
  }

  submitTicketForm(): void {
    let ticketTypeQuantity = [];
    this.buyTicketsForm.value.ticketTypeQuantity.forEach(ticketType => {
      const ticketTypeQuantityLine = {
        ticketTypeId: ticketType['id'],
        ticketQuantity: Number(ticketType['quantity']),
      } as TicketTypeQuantityDto
      ticketTypeQuantity.push(ticketTypeQuantityLine);
    })

    const createNewTicket = {
      eventId: this.event.id,
      firstName: this.buyTicketsForm.value.firstName,
      lastName: this.buyTicketsForm.value.lastName,
      email: this.buyTicketsForm.value.email,
      ticketTypes: ticketTypeQuantity,
    } as CreateTicketCommand

    this.ticketsClient.createTicket(createNewTicket).subscribe({
      next: result => {
        this.buyTicketsForm.reset();
        this.toggleConfirmation();
      },
      error: error => console.log(error),
    });
  }

  toggleTicketTypes(): void {
    this.viewState = BuyTicketsViewState.TicketTypesSelection;
  }

  toggleCheckout(): void {
    this.viewState = BuyTicketsViewState.Checkout;
    console.log(this.ticketTypeQuantity);
  }

  toggleConfirmation(): void {
    this.viewState = BuyTicketsViewState.Confirmation;
  }
}
