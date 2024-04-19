import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EventDto, EventsClient, TicketsClient, TicketTypeDto, TicketTypesClient} from "../../../web-api-client";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './buy-tickets.component.html',
  styles: ``
})
export class BuyTicketsComponent implements OnInit{
  public eventId: number;
  public event: EventDto;

  public ticketTypes: TicketTypeDto[] = [];
  public activeTicketType: TicketTypeDto;

  public showEventInformation: boolean = false;
  public showBuyerForm: boolean = false;
  public showSummary: boolean = false;

  public newTicketForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsClient: EventsClient,
    private ticketTypesClient: TicketTypesClient,
  ) {}

  ngOnInit() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEvent(this.eventId);
    this.showEventInformationPage();
  }

  getTicketTypes(id: number): void {
    this.ticketTypesClient.getTicketTypesByEventId(id).subscribe({
      next: result => this.ticketTypes = result,
      error: err => console.log(err),
    });
  }

  getEvent(id: number): void {
    this.eventsClient.getEventById(id).subscribe({
      next: result => this.event = result,
      error: err => console.log(err),
    });
  }

  showEventInformationPage(): void {
    this.showEventInformation = true;
    this.showBuyerForm = false;
    this.showSummary = false;
  }

  showBuyerFormPage(): void {
    this.showEventInformation = false;
    this.showBuyerForm = true;
    this.showSummary = false;
  }

  showSummaryPage(): void {
    this.showEventInformation = false;
    this.showBuyerForm = false;
    this.showSummary = true;
  }

}
