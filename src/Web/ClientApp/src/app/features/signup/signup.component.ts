import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MembersClient, CreateMemberCommand } from 'src/app/web-api-client';
import { StripeService } from 'ngx-stripe';
import { StripeEmbeddedCheckoutOptions } from '@stripe/stripe-js';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent implements OnInit{
  public memberSecret: string;
  public newMemberForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    isFresher: new FormControl(false)
  });

  constructor(
    private membersClient: MembersClient,
    private stripeService: StripeService,
  ) {}

  ngOnInit(): void {
  }

  createMember(): void {
    const newMember = {
      firstName: this.newMemberForm.controls.firstName.value,
      lastName: this.newMemberForm.controls.lastName.value,
      emailAddress: this.newMemberForm.controls.email.value,
      isFresher: this.newMemberForm.controls.isFresher.value,
    } as CreateMemberCommand

    this.membersClient.createMember(newMember).subscribe({
      next: result => this.mountCheckout(result),
      error: error => console.error(error),
    });
  }

  mountCheckout(clientSecret: string){
    this.stripeService.initEmbeddedCheckout({clientSecret});
  }
}
