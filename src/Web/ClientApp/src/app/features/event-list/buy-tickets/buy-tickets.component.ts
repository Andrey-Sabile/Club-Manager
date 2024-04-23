import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EventDto, EventsClient, TicketsClient, TicketTypeDto, TicketTypesClient} from "../../../web-api-client";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './buy-tickets.component.html',
  styles: ``
})
export class BuyTicketsComponent implements OnInit{
  public eventId: number;
  public event: EventDto;

  public ticketTypes: TicketTypeDto[] = [];
  public activeTicketType: TicketTypeDto;

  public showEventInformation: boolean = false;
  public showBuyerForm: boolean = false;
  public showSummary: boolean = false;

  public ticketForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
  });

  public ticketTypeForm = this.formBuilder.group({
    ticketTypesFormArray: this.formBuilder.array([this.formBuilder.control(0)])
  });
  get ticketTypesFormArray(): FormArray {
    return this.ticketTypeForm.get("ticketTypesFormArray") as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsClient: EventsClient,
    private ticketTypesClient: TicketTypesClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEvent(this.eventId);
    this.getTicketTypes(this.eventId);
    this.showEventInformationPage();
  }

  getEvent(id: number): void {
    this.eventsClient.getEventById(id).subscribe({
      next: result => this.event = result,
      error: err => console.log(err),
    });
  }

  getTicketTypes(id: number): void {
    this.ticketTypesClient.getTicketTypesByEventId(id).subscribe({
      next: result => this.ticketTypes = result,
      error: err => console.log(err),
    });

    this.ticketTypes.forEach(ticketType => {
      this.ticketTypesFormArray.push(this.formBuilder.control(0));
    });
  }



  showEventInformationPage(): void {
    this.showEventInformation = true;
    this.showBuyerForm = false;
    this.showSummary = false;
  }

  showBuyerFormPage(): void {
    this.showEventInformation = false;
    this.showBuyerForm = true;
    this.showSummary = false;
  }

  showSummaryPage(): void {
    this.showEventInformation = false;
    this.showBuyerForm = false;
    this.showSummary = true;
    console.log(this.ticketForm);
  }
}
