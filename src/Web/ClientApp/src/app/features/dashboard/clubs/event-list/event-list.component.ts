import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveClubService } from 'src/app/core/services/active-club.service';
import { ClubDto, EventDto, EventsClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './event-list.component.html',
  styles: ``
})
export class EventListComponent implements OnInit {
  public eventsList: EventDto[] = [];
  public activeClub: ClubDto;

  constructor(
    private eventsClient: EventsClient,
    private activeClubService: ActiveClubService
  ) { }

  ngOnInit(): void {
    this.getEvents();
    this.activeClub = this.activeClubService.activeClub();
    console.log(this.activeClub);
  }

  private getEvents(): void {
    this.eventsClient.getEvents().subscribe({
      next: result => this.eventsList = result,
      error: error => console.log(error),
    });
  }
}
