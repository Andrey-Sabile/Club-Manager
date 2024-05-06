import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClubDto, ClubsClient, MemberDto, MembersClient, UpdateClubCommand, EventDto, EventsClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './club-detail.component.html',
  styles: ``
})
export class ClubDetailComponent implements OnInit{
  public clubId: number;
  public club: ClubDto;
  public clubMembers: MemberDto[] = [];
  public eventsList: EventDto[] = [];

  public editClubForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    contactEmail: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private clubsClient: ClubsClient,
    private membersClient: MembersClient,
    private eventsClient: EventsClient,
  ){}

  ngOnInit(): void {
    this.clubId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getClub(this.clubId);
    this.getClubMembers(this.clubId);
    this.getClubEvents(this.clubId);
  }

  getClub(id: number): void {
    this.clubsClient.getClubById(id).subscribe({
      next: result => this.club = result,
      error: err => console.log(err),
    })
  }

  getClubMembers(clubId: number): void {
    this.membersClient.getMembers(clubId).subscribe({
      next: result => this.clubMembers = result,
      error: err => console.log(err),
    });
  }

  getClubEvents(clubId: number): void {
    this.eventsClient.getEventsByClubId(clubId).subscribe({
      next: result => this.eventsList = result,
      error: error => console.log(error),
    })
  }

  populateClubDetailFormWithCurrentValues(): void {
    this.editClubForm.controls.name.setValue(this.club.name);
    this.editClubForm.controls.description.setValue(this.club.description);
    this.editClubForm.controls.contactEmail.setValue(this.club.contactEmail);
  }

  updateClubDetails(): void {
    const updatedClubDetails = {
      id: this.club.id,
      name: this.editClubForm.controls.name.value,
      description: this.editClubForm.controls.description.value,
      logoUrl: this.club.logoUrl,
      contactEmail: this.editClubForm.controls.contactEmail.value
    } as UpdateClubCommand

    this.clubsClient.updateClub(this.clubId, updatedClubDetails).subscribe({
      next: value => this.editClubForm.reset(),
      error: err => console.log(err),
    });

    this.club.name = updatedClubDetails.name;
    this.club.description = updatedClubDetails.description;
    this.club.logoUrl = updatedClubDetails.logoUrl;
    this.club.contactEmail = updatedClubDetails.contactEmail;
  }
}
