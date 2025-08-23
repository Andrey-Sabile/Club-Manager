import { Routes } from "@angular/router";
import { SignupComponent } from "./features/clubs/signup/signup.component";
import { EventDiscoveryComponent } from "./features/events/event-discovery/event-discovery.component";
import { EventDashboardComponent } from "./features/dashboard/events/event-dashboard/event-dashboard.component";
import { NewEventComponent } from "./features/dashboard/events/new-event/new-event.component";
import { BuyTicketsComponent } from "./features/events/buy-tickets/buy-tickets.component";
import { NewClubComponent } from "./features/dashboard/clubs/new-club/new-club.component";
import { ClubDetailComponent } from "./features/clubs/club-detail/club-detail.component";
import { EventLandingComponent } from "./features/events/event-landing/event-landing.component";
import { HomeComponent } from "./features/home/home.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { SideMenuComponent } from "./features/dashboard/side-menu/side-menu.component";
import { EventListComponent } from "./features/dashboard/clubs/event-list/event-list.component";
import { MemberListComponent } from "./features/dashboard/clubs/member-list/member-list.component";
import { FinanceComponent } from "./features/dashboard/clubs/finance/finance.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'clubs',
    children: [
      { path: '', component: HomeComponent },
      {
        path: ':id',
        children: [
          { path: '', component: ClubDetailComponent },
          { path: 'sign-up', component: SignupComponent },
        ]
      }
    ]
  },
  {
    path: 'events',
    children: [
      { path: '', component: EventDiscoveryComponent },
      { path: ':id', component: EventLandingComponent },
    ]
  },
  {
    path: 'dashboard',
    component: SideMenuComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'clubs/:id',
        children: [
          { path: 'new-club', component: NewClubComponent },
          { path: 'new-event', component: NewEventComponent },
          { path: 'events', component: EventListComponent },
          { path: 'members', component: MemberListComponent },
          { path: 'finance', component: FinanceComponent },
        ]
      },
      {
        path: 'events/:id',
        children: [
          { path: '', component: EventDashboardComponent },
          { path: 'buy-tickets', component: BuyTicketsComponent },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
