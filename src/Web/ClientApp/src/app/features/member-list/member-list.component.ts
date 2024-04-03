import { Component, OnInit } from '@angular/core';
import { MembersClient, MemberDto } from 'src/app/web-api-client';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-list.component.html',
  styles: ``
})
export class MemberListComponent implements OnInit{
  public membersList: MemberDto[] = [];

  constructor(
    private membersClient: MembersClient,
  ){}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.membersClient.getMembers().subscribe({
      next: result =>  this.membersList = result,
      error: error => console.log(error)
    });
  }
}
