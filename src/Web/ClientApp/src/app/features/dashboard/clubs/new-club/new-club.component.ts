import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsClient, CreateClubCommand, FileParameter } from 'src/app/web-api-client';

@Component({
  selector: 'app-new-club',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-club.component.html',
  styles: ``
})
export class NewClubComponent {
  public newClubForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', Validators.required),
    contactEmail: new FormControl('', Validators.required),
    logoUrl: new FormControl(''),
  })
  selectedFile: File | null = null;

  constructor(
    private clubsClient: ClubsClient,
    private router: Router,
  ) { }

  createClub(): void {
    this.uploadFile();
    const newClub = {
      name: this.newClubForm.controls.name.value,
      description: this.newClubForm.controls.description.value,
      logoUrl: this.selectedFile.name,
      contactEmail: this.newClubForm.controls.contactEmail.value,
    } as CreateClubCommand

    this.clubsClient.createClub(newClub).subscribe({
      next: result => {
        this.newClubForm.reset();
        this.router.navigate(['clubs']);
      }
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const fileParameter = {
        fileName: this.selectedFile.name,
        data: this.selectedFile,
      } as FileParameter
      this.clubsClient.uploadAvatar(fileParameter).subscribe({
        error: error => console.error(error),
      })
    }
  }
}
