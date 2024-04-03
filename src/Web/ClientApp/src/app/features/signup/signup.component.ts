import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MembersClient, CreateMemberCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  public newMemberForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    isFresher: new FormControl()
  });

  constructor(
    private membersClient: MembersClient,
  ) {}

  createMember(): void {
    const newMember = {
      firstName: this.newMemberForm.controls.firstName.value,
      lastName: this.newMemberForm.controls.lastName.value,
      emailAddress: this.newMemberForm.controls.email.value,
      isFresher: this.newMemberForm.controls.isFresher.value,
    } as CreateMemberCommand

    this.membersClient.createMember(newMember).subscribe({
      next: result => this.newMemberForm.reset(),
      error: error => console.error(error),
    });
  }
}
