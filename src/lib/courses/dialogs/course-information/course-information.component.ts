import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { isEmpty, keys } from 'lodash';

import { Course, CourseCategory } from '@/types/course.type';
import { SelectOption } from '@/types/select-option.type';

@Component({
    selector: 'app-course-information-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
    ],
    templateUrl: './course-information.component.html',
    styleUrl: './course-information.component.scss',
})
export class CourseInformationDialog {
    private readonly _data = inject(MAT_DIALOG_DATA);
    private readonly _dialogRef = inject(MatDialogRef<CourseInformationDialog>);
    private readonly course: Course | undefined = this._data.course;
    readonly courseCategories: SelectOption<CourseCategory>[] = [
        {
            label: 'Art',
            value: CourseCategory.ART,
        },
        {
            label: 'English',
            value: CourseCategory.ENGLISH,
        },
        {
            label: 'History',
            value: CourseCategory.HISTORY,
        },
        {
            label: 'Math',
            value: CourseCategory.MATH,
        },
        {
            label: 'Science',
            value: CourseCategory.SCIENCE,
        },
        {
            label: 'OTHER',
            value: CourseCategory.OTHER,
        },
    ];

    type: 'Create' | 'Edit' = this._data.type;

    form = new FormGroup(
        {
            id: new FormControl(this._data.course?.id ?? undefined, this.type === 'Edit' ? [Validators.required] : []),
            category: new FormControl(this.course?.category ?? undefined, [Validators.required]),
            categoryIdentifier: new FormControl(this.course?.categoryIdentifier ?? undefined, [
                Validators.required,
                Validators.min(100),
                Validators.max(999),
            ]),
            name: new FormControl(this.course?.name ?? undefined, [Validators.required, Validators.maxLength(100)]),
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
    min: 'Value must be greated than or equal to 100',
    max: 'Value must be less than or equal to 999',
    maxLength: 'Value must be less than or equal to 100 characters',
});
