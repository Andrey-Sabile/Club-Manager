import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsClient, CreateClubCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-new-club',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-club.component.html',
  styles: ``
})
export class NewClubComponent {
  public newClubForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    contactEmail: new FormControl('', Validators.required),
    logoUrl: new FormControl(''),
  })

  constructor(
    private clubsClient: ClubsClient,
    private router: Router,
  ){}

  createClub(): void {
    const newClub = {
      name: this.newClubForm.controls.name.value,
      description: this.newClubForm.controls.description.value,
      logoUrl: this.newClubForm.controls.logoUrl.value,
      contactEmail: this.newClubForm.controls.contactEmail.value,
    } as CreateClubCommand

    this.clubsClient.createClub(newClub).subscribe({
      next: result => {
        this.newClubForm.reset();
        this.router.navigate(['clubs']);
      }
    })
  }
}
