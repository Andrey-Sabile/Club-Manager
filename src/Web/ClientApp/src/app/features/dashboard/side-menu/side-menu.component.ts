import {Component, OnInit, Signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ClubDto, ClubsClient} from "../../../web-api-client";
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
  public activeClub: Signal<ClubDto>

  constructor(
    private clubsClient: ClubsClient,
    private activeClubService: ActiveClubService,
  ) {
  }

  ngOnInit(): void {
    this.getClubs();
    this.getActiveClub();
    this.setActiveClub(this.clubList)
  }

  getClubs(): void {
    this.clubsClient.getClubs().subscribe({
      next: result => this.clubList = result,
      error: error => console.log(error),
    })
  }

  getActiveClub(): void {
    this.activeClub = this.activeClubService.activeClub;
  }

  setActiveClub(clubDto: ClubDto): void {
    this.activeClubService.setActiveClub(clubDto);
  }
}
