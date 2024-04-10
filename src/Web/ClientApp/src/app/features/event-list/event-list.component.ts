import { Component, OnInit } from '@angular/core';
import { EventsClient, EventDto } from "../../web-api-client";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './event-list.component.html',
  styles: ``
})
export class EventListComponent implements OnInit{
  public eventsList: EventDto[] = [];

  constructor(
    private eventsClient: EventsClient,
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsClient.getEvents().subscribe({
      next: result => this.eventsList = result,
      error: error => console.log(error),
    });
  }
}
