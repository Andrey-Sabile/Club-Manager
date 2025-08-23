import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveClubService } from 'src/app/core/services/active-club.service';
import { ClubDto, EventDto, EventsClient, SoldTicketsDto, TicketsClient } from 'src/app/web-api-client';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    DatePipe,
  ],
  templateUrl: './event-list.component.html',
  styles: ``
})
export class EventListComponent implements OnInit {
  public eventsList: EventDto[] = [];
  public activeClub: ClubDto;
  public eventLocationDot = faLocationDot;
  public ticketStats: SoldTicketsDto;

  constructor(
    private eventsClient: EventsClient,
    private activeClubService: ActiveClubService,
    private ticketsClient: TicketsClient
  ) { }

  ngOnInit(): void {
    this.getEvents();
    this.activeClub = this.activeClubService.activeClub();
  }

  private getEvents(): void {
    this.eventsClient.getEvents().subscribe({
      next: result => this.eventsList = result,
      error: error => console.log(error),
    });
  }

  private getTicketStats(id: number): void {
    this.ticketsClient.getTicketsSold(id).subscribe({
      next: result => this.ticketStats = result,
      error: err => console.log(err),
    });
  }
}
