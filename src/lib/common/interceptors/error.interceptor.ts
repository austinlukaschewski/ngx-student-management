import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';

import { AppService } from '../services/app.service';

export const ErrorInterceptorFn: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const appService = inject(AppService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(error);
            appService.displayErrorSnackbar(`${error.status}: ${error.error.message}`);

            return of();
        }),
    );
};
