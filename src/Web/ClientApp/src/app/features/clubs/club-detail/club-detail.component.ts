import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClubDto, ClubsClient, MemberDto, MembersClient, EventDto, EventsClient } from 'src/app/web-api-client';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
  ],
  templateUrl: './club-detail.component.html',
  styles: ``
})
export class ClubDetailComponent implements OnInit {
  public clubId: number;
  public club: ClubDto;
  public clubMembers: MemberDto[] = [];
  public eventsList: EventDto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clubsClient: ClubsClient,
    private membersClient: MembersClient,
    private eventsClient: EventsClient,
  ) { }

  ngOnInit(): void {
    this.clubId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getClub(this.clubId);
    this.getClubEvents(this.clubId);
  }

  getClub(id: number): void {
    this.clubsClient.getClubById(id).subscribe({
      next: result => this.club = result,
      error: err => console.log(err),
    })
  }

  getClubEvents(clubId: number): void {
    this.eventsClient.getEventsByClubId(clubId).subscribe({
      next: result => this.eventsList = result,
      error: error => console.log(error),
    })
  }
}
