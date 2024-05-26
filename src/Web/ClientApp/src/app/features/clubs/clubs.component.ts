import { Component, OnInit } from '@angular/core';
import { ClubDto, ClubsClient } from 'src/app/web-api-client';
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './clubs.component.html',
  styles: ``
})
export class ClubsComponent  implements OnInit{
  public faEnvelope = faEnvelope;
  public clubList: ClubDto[] = [];

  constructor(
    private clubsClient: ClubsClient,
  ) {}

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubsClient.getClubs().subscribe({
      next: result => this.clubList = result,
      error: error => console.log(error),
    })
  }
}
