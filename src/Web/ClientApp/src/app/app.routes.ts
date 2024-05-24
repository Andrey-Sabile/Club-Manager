import { Routes } from "@angular/router";
import { TodoComponent } from "./features/todo/todo.component";
import { SignupComponent } from "./features/clubs/signup/signup.component";
import { EventListComponent} from "./features/event-list/event-list.component";
import { EventDashboardComponent} from "./features/event-list/event-dashboard/event-dashboard.component";
import { NewEventComponent} from "./features/event-list/new-event/new-event.component";
import { BuyTicketsComponent } from "./features/event-list/buy-tickets/buy-tickets.component";
import { ClubsComponent } from "./features/clubs/clubs.component";
import { NewClubComponent } from "./features/clubs/new-club/new-club.component";
import { ClubDetailComponent } from "./features/clubs/club-detail/club-detail.component";
import { EventLandingComponent } from "./features/event-landing/event-landing.component";

export const routes: Routes = [
    { path: '', component: EventListComponent, pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'clubs', component: ClubsComponent },
    { path: 'clubs/new-club', component: NewClubComponent },
    { path: 'clubs/:id', component: ClubDetailComponent },
    { path: 'clubs/:id/sign-up', component: SignupComponent },
    { path: 'clubs/:id/new-event', component: NewEventComponent },
    { path: 'events', component: EventListComponent },
    { path: 'events/:id', component: EventLandingComponent },
    { path: 'events/dashboard/:id', component: EventDashboardComponent },
    { path: 'events/:id/buy-tickets', component: BuyTicketsComponent },
]
