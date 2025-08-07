import { Component, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ClubDto, ClubsClient } from "../../../web-api-client";
import { ActiveClubService } from "../../../core/services/active-club.service";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent implements OnInit {
  public clubList: ClubDto[] = [];
  public activeClub: ClubDto;

  constructor(
    private clubsClient: ClubsClient,
    private activeClubService: ActiveClubService,
  ) {
  }

  ngOnInit(): void {
    this.getAndSetActiveClub();
  }

  private getAndSetActiveClub(): void {
    this.clubsClient.getClubById(1).subscribe({
      next: result => {
        this.activeClub = result;
        this.activeClubService.setActiveClub(this.activeClub);
      },
      error: error => console.log(error),
    })
  };

}
