import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './core/components/nav-menu/nav-menu.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [NavMenuComponent, RouterOutlet]
})
export class AppComponent {
  title = 'app';
}
