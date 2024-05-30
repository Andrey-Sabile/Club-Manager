import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersClient, CreateMemberCommand, ClubDto, ClubsClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent  implements OnInit{
  public clubId: number;
  public club: ClubDto;
  public hasSignedUp: boolean = false;

  public newMemberForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    isFresher: new FormControl(false)
  });

  constructor(
    private membersClient: MembersClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clubsClient: ClubsClient,
  ) {}

  ngOnInit(): void {
    this.clubId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getClub(this.clubId);
  }

  createMember(): void {
    const newMember = {
      clubId: this.clubId,
      firstName: this.newMemberForm.controls.firstName.value,
      lastName: this.newMemberForm.controls.lastName.value,
      emailAddress: this.newMemberForm.controls.email.value,
      isFresher: this.newMemberForm.controls.isFresher.value,
    } as CreateMemberCommand

    this.membersClient.createMember(newMember).subscribe({
      next: result => {
        this.router.navigateByUrl('sign-up/success');
        this.hasSignedUp = true;
      },
      error: error => console.error(error),
    });
  }

  getClub(clubId: number): void {
    this.clubsClient.getClubById(clubId).subscribe({
      next: result => this.club = result,
      error: err => console.log(err),
    })
  }
}
