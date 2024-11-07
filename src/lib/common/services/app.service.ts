import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AppService {
    private readonly _router = inject(Router);
    private readonly _snackbar = inject(MatSnackBar);

    displayErrorSnackbar(message: string): void {
        this._snackbar.open(message, 'Close', {
            panelClass: 'error-snackbar',
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
        // .onAction()
        // .pipe(take(1))
        // .subscribe(() => {
        //     this._router.navigateByUrl('/');
        // });
    }

    displayInfoSnackbar(message: string): void {
        this._snackbar.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }
}
