import { Routes } from "@angular/router";
import { TodoComponent } from "./features/todo/todo.component";
import { MemberListComponent } from "./features/member-list/member-list.component";
import { SignupComponent } from "./features/signup/signup.component";
import { SignupSuccessComponent } from "./features/signup/signup-success/signup-success.component";
import { EventListComponent} from "./features/event-list/event-list.component";
import { EventDashboardComponent} from "./features/event-list/event-dashboard/event-dashboard.component";
import { NewEventComponent} from "./features/event-list/new-event/new-event.component";
import { BuyTicketsComponent } from "./features/event-list/buy-tickets/buy-tickets.component";
import { ClubsComponent } from "./features/clubs/clubs.component";
import { NewClubComponent } from "./features/clubs/new-club/new-club.component";
import { ClubDetailComponent } from "./features/clubs/club-detail/club-detail.component";

export const routes: Routes = [
    { path: '', component: EventListComponent, pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'clubs', component: ClubsComponent },
    { path: 'clubs/new-club', component: NewClubComponent },
    { path: 'clubs/:id', component: ClubDetailComponent },
    { path: 'clubs/:id/sign-up', component: SignupComponent },
    { path: 'sign-up/success', component: SignupSuccessComponent },
    { path: 'members', component: MemberListComponent },
    { path: 'events', component: EventListComponent },
    { path: 'events/:id', component: EventDashboardComponent },
    { path: 'events/:id/buy-tickets', component: BuyTicketsComponent },
    { path: 'new-event', component: NewEventComponent },
]
