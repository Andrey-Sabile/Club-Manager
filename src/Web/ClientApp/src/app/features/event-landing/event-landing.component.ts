import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClubsClient, EventDto, EventsClient, TicketTypeDto, TicketTypesClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-event-landing',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './event-landing.component.html',
  styles: ``
})
export class EventLandingComponent implements OnInit{
  public eventId: number;
  public event: EventDto;
  public ticketTypes: TicketTypeDto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsClient: EventsClient,
    private ticketTypesClient: TicketTypesClient,
    private clubsClient: ClubsClient,
  ) {}

  ngOnInit(): void {
      this.eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getEvent(this.eventId);
      this.getTicketTypes(this.eventId);
  }

  getEvent(id: number): void {
    this.eventsClient.getEventById(id).subscribe({
      next: result => this.event = result,
      error: err => console.log(err),
    });
  }

  getTicketTypes(eventId: number): void {
    this.ticketTypesClient.getTicketTypesByEventId(eventId).subscribe({
      next: result => this.ticketTypes = result,
      error: error => console.log(error),
    });
  }

}
