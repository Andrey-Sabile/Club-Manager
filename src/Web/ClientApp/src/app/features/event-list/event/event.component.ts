import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventDto, EventsClient} from "../../../web-api-client";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styles: ``
})
export class EventComponent implements OnInit{
  public event: EventDto;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsClient: EventsClient,
  ) {}
  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.eventsClient.getEventById(id).subscribe({
      next: result => this.event = result,
      error: err => console.log(err),
    });
  }
}
