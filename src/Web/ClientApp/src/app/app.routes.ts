import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { TodoComponent } from "./features/todo/todo.component";
import { MemberListComponent } from "./features/member-list/member-list.component";

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'members', component: MemberListComponent },
]