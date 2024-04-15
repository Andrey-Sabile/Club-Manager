import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
  EventDto,
  EventsClient,
  SoldTicketsDto,
  TicketsClient,
  TicketTypeDto,
  TicketTypesClient
} from "../../../web-api-client";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event-dashboard.component.html',
  styles: ``
})
export class EventDashboardComponent implements OnInit{
  public event: EventDto;
  public ticketTypes: TicketTypeDto[] = [];
  public eventId: number;
  public ticketStats: SoldTicketsDto;

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
}
