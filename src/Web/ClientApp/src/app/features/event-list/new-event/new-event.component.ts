import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Router } from "@angular/router";
import { CreateEventCommand, EventsClient } from "../../../web-api-client";

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-event.component.html',
  styles: ``
})
export class NewEventComponent {
  public newEventForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    when: new FormControl()
  });

  constructor(
    private eventsClient: EventsClient,
    private router: Router,
  ) {}

  createEvent(): void {
    const newEvent = {
      name: this.newEventForm.controls.name.value,
      when: this.newEventForm.controls.when.value,
      location: this.newEventForm.controls.location.value,
    } as CreateEventCommand

    this.eventsClient.createEvents(newEvent).subscribe({
      next: result => this.router.navigateByUrl('events')
    });
  }
}
