import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { GuardsCheckEnd, NavigationEnd } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { provideNgProgressRouter } from 'ngx-progressbar/router';

import { appRoutes } from './app.routes';

import { ErrorInterceptorFn } from '@/lib/common/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideAnimationsAsync(),
        provideHttpClient(withFetch(), withInterceptors([ErrorInterceptorFn])),
        provideNgProgressRouter({
            startEvents: [GuardsCheckEnd],
            completeEvents: [NavigationEnd],
            minDuration: 500,
        }),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
};
