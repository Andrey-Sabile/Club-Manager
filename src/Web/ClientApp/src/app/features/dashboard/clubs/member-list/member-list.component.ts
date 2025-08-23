import { Component, OnInit } from '@angular/core';
import { MemberDto, MembersClient } from 'src/app/web-api-client';
import { ActivatedRoute, RouterLink } from "@angular/router";


@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-list.component.html',
  styles: ``
})
export class MemberListComponent implements OnInit {
  public memberList: MemberDto[] = [];
  public clubId: number;

  constructor(
    private membersClient: MembersClient,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.clubId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getMembers();
  }

  private getMembers(): void {
    this.membersClient.getMembers(this.clubId).subscribe({
      next: result => this.memberList = result,
      error: err => console.log(err),
    });
  }
}
