import { Injectable } from '@angular/core';
import { EventDto } from '../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class EventFilterService {

  constructor() { }

  private getNextWeekendDates() {
    const today = new Date();
    const dayOfWeek = today.getDate();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    const daysUntilSunday = (7 - dayOfWeek + 7) % 7;

    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);

    return {
      saturday: nextSaturday,
      sunday: nextSunday
    };
  }

  public filterEventsForNextWeekend(events: EventDto[]): EventDto[] {
    const { saturday, sunday } = this.getNextWeekendDates();

    return events.filter(event => {
      const eventDate = new Date(event.when);
      return eventDate >= saturday && eventDate <= sunday;
    });
  }
}
