import { Component, OnInit } from '@angular/core';
import { EventDto, EventsClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-event-discovery',
  standalone: true,
  imports: [],
  templateUrl: './event-discovery.component.html',
  styles: ``
})
export class EventDiscoveryComponent implements OnInit{
  public eventsList: EventDto[] = [];

  constructor(
    private eventsClient: EventsClient,
  ) {}

  ngOnInit(): void {
      this.getEvents();
  }

  getEvents(): void {
    this.eventsClient.getEvents().subscribe({
      next: result => this.eventsList = result,
      error: error => console.error(error),
    })
  }
}
