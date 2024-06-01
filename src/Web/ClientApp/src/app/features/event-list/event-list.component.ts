import { Component, OnInit } from '@angular/core';
import { EventsClient, EventDto } from "../../web-api-client";
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './event-list.component.html',
  styles: ``
})
export class EventListComponent implements OnInit{
  public eventsList: EventDto[] = [];
  public faLocationDot = faLocationDot;

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
