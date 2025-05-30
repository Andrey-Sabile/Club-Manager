import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { APP_ID, ApplicationConfig, enableProdMode, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthorizeInterceptor } from './core/api-authorization/authorize.interceptor';
import { routes } from './app.routes';
// import { provideNgxStripe } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        provideAnimations(),
        // provideNgxStripe(environment.stripeSecret),
        // importProvidersFrom(ModalModule.forRoot()),
        { provide: APP_ID, useValue: 'ng-cli-universal'},
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true},
        { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
    ]
}