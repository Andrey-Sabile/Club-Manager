import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EventDto, EventsClient } from 'src/app/web-api-client';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-event-discovery',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './event-discovery.component.html',
  styles: ``
})
export class EventDiscoveryComponent implements OnInit{
  public eventsList: EventDto[] = [];
  public eventLocationDot = faLocationDot;

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
