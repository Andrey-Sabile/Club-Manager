import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { TodoComponent } from "./features/todo/todo.component";
import { MemberListComponent } from "./features/member-list/member-list.component";
import { SignupComponent } from "./features/signup/signup.component";
import { SignupSuccessComponent } from "./features/signup/signup-success/signup-success.component";
import { EventListComponent} from "./features/event-list/event-list.component";
import { EventDashboardComponent} from "./features/event-list/event-dashboard/event-dashboard.component";
import { NewEventComponent} from "./features/event-list/new-event/new-event.component";

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'members', component: MemberListComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'sign-up/success', component: SignupSuccessComponent},
    { path: 'events', component: EventListComponent},
    { path: 'events/:id', component: EventDashboardComponent},
    { path: 'new-event', component: NewEventComponent},
]
