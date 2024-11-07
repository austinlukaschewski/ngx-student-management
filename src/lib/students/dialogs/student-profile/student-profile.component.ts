import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { isEmpty, keys } from 'lodash';

import type { Student } from '@/types/student.type';

@Component({
    selector: 'app-student-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule],
    templateUrl: './student-profile.component.html',
    styleUrl: './student-profile.component.scss',
})
export class StudentProfileDialogComponent {
    private readonly _data = inject(MAT_DIALOG_DATA);
    private readonly _dialogRef = inject(MatDialogRef<StudentProfileDialogComponent>);
    private readonly student: Student | undefined = this._data.student;
    type: 'Create' | 'Edit' = this._data.type;

    form = new FormGroup(
        {
            id: new FormControl(this.student?.id ?? undefined, this.type === 'Edit' ? [Validators.required] : []),
            firstName: new FormControl(this.student?.firstName ?? undefined, [Validators.required]),
            middleName: new FormControl(this.student?.middleName ?? undefined, []),
            lastName: new FormControl(this.student?.lastName ?? undefined, [Validators.required]),
            email: new FormControl(this.student?.email ?? undefined, [Validators.required, Validators.email]),
        },
        { updateOn: 'change' },
    );

    getError(name: string): string | undefined {
        const ctrl = this.form.get(name);
        if (isEmpty(ctrl?.errors)) return undefined;

        const errorKeys = keys(ctrl?.errors);
        return errorMessageLkp[errorKeys[0]];
    }

    onSubmit(): void {
        this._dialogRef.close(this.form.value);
    }
}

const errorMessageLkp: Record<string, string> = Object.freeze({
    required: 'This field is required',
    email: 'Invalid email address',
});
