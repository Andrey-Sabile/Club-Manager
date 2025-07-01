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

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'clubs', redirectTo: '', pathMatch: 'full' },
    { path: 'dashboard/clubs/new-club', component: NewClubComponent },
    { path: 'clubs/:id', component: ClubDetailComponent },
    { path: 'clubs/:id/sign-up', component: SignupComponent },
    { path: 'clubs/:id/new-event', component: NewEventComponent },
    { path: 'events', component: EventDiscoveryComponent },
    { path: 'events/:id', component: EventLandingComponent },
    { path: 'events/dashboard/:id', component: EventDashboardComponent },
    { path: 'events/:id/buy-tickets', component: BuyTicketsComponent },
]
