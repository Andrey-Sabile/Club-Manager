import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsClient, CreateClubCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-new-club',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-club.component.html',
  styles: ``
})
export class NewClubComponent {
  public newClubForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    contactEmail: new FormControl(''),
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
