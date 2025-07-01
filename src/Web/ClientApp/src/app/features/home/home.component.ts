import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { ClubDto, ClubsClient, EventsClient, EventDto } from 'src/app/web-api-client';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        RouterLink,
        FontAwesomeModule,
    ]
})
export class HomeComponent implements OnInit {
    public clubList: ClubDto[] = [];
    public clubLogoPath: string;
    public eventsList: EventDto[] = [];
    public faEnvelope = faEnvelope;
    public faLocationDot = faLocationDot

    constructor(
        private clubsClient: ClubsClient,
        private eventsClient: EventsClient,
    ) { }

    ngOnInit(): void {
        this.getClubs();
        this.getEvents();
    }

    getClubs(): void {
        this.clubsClient.getClubs().subscribe({
            next: result => this.clubList = result,
            error: error => console.log(error),
        })
    }

    getEvents(): void {
        this.eventsClient.getEvents().subscribe({
            next: result => this.eventsList = result,
            error: error => console.log(error),
        });
    }
}

