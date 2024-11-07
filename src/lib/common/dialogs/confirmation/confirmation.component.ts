import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    templateUrl: './confirmation.component.html',
    styleUrl: './confirmation.component.scss',
})
export class ConfirmationDialogComponent {
    private readonly _dialogData = inject(MAT_DIALOG_DATA);

    message = this._dialogData.message ?? 'Are you sure you want to proceed?';
}
