import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { size } from 'lodash';
import { delay, map, Observable, shareReplay, take } from 'rxjs';
import { CourseApiService } from '@/lib/common/services/course-api.service';

import { StudentNamePipe } from '@/lib/common/pipes/student-name.pipe';
import { Course } from '@/types/course.type';
import { Student } from '@/types/student.type';
import { StudentNameStyle } from '@/types/student-name-style.enum';

@Component({
    selector: 'app-course-registration',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        StudentNamePipe,
    ],
    providers: [CourseApiService],
    templateUrl: './course-registration.component.html',
    styleUrl: './course-registration.component.scss',
})
export class CourseRegistrationComponent {
    private readonly _api = inject(CourseApiService);
    private readonly _data = inject(MAT_DIALOG_DATA);
    private readonly _dialogRef = inject(MatDialogRef);

    readonly student: Student = this._data.student;
    courses$: Observable<Course[]> = this._api.getAll().pipe(take(1), shareReplay(1));
    isCoursesLoaded$ = this.courses$.pipe(
        delay(1000), // For effect only..
        map((courses) => size(courses) > 0),
    );

    vm: { courseId?: string; studentId: string } = { studentId: this.student.id };

    get StudentNameStyle() {
        return StudentNameStyle;
    }

    onSubmit(): void {
        this._dialogRef.close(this.vm);
    }
}
