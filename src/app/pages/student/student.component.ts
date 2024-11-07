import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { indexOf, isEqual } from 'lodash';
import { distinctUntilChanged, map } from 'rxjs';
import { StudentApiService } from '@/lib/common/services/student-api.service';

import { StudentService } from './student.service';

import { StudentNamePipe } from '@/lib/common/pipes/student-name.pipe';
import { AppService } from '@/lib/common/services/app.service';
import { StudentsRegisteredCourseComponent } from '@/lib/students/components/registered-course/registered-course.component';
import type { Student } from '@/types/student.type';
import { StudentCourseRegistration } from '@/types/student-course-registration.type';
import { StudentNameStyle } from '@/types/student-name-style.enum';

@Component({
    selector: 'app-students',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule,
        StudentsRegisteredCourseComponent,
        StudentNamePipe,
    ],
    providers: [StudentService, StudentApiService],
    templateUrl: './student.component.html',
    styleUrl: './student.component.scss',
})
export class StudentComponent {
    private readonly _apiService = inject(StudentApiService);
    private readonly _appService = inject(AppService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);

    readonly service = inject(StudentService);

    get StudentNameStyle() {
        return StudentNameStyle;
    }

    tabs = ['Profile', 'Courses'];
    selectedIndex = 0;

    selectedIndex$ = this._route.queryParamMap.pipe(
        map((queryParams) => {
            const param = queryParams.get('tab');
            if (!param) return 0;

            return indexOf(this.tabs, param);
        }),
        distinctUntilChanged(isEqual),
    );

    updateQueryParams(tabIndex: number): void {
        let tab = this.tabs[tabIndex];
        if (!tab) tab = this.tabs[0];

        this._router.navigate([], {
            queryParams: { tab },
            queryParamsHandling: 'merge',
            relativeTo: this._route,
        });
    }

    onUpdateStudent(student: Student): void {
        this._apiService.updateStudent(student).subscribe((student) => {
            if (!student) return;
            this._appService.displayInfoSnackbar('Updated student profile');

            this._router.navigate([this._router.url], { onSameUrlNavigation: 'reload', skipLocationChange: true });
        });
    }

    onDeleteStudent(student: Student): void {
        this._apiService.deleteStudent(student).subscribe((isDeleted) => {
            if (isDeleted) {
                this._appService.displayInfoSnackbar('Deleted student profile');

                this._router.navigate(['/students']);
            }
        });
    }

    onRegisterForCourse(student: Student): void {
        this._apiService.registerForCourse(student).subscribe((registration) => {
            if (!registration) return;

            this._appService.displayInfoSnackbar(`Registered student for ${registration?.course.name}`);

            this._router.navigateByUrl(this._router.url, {
                onSameUrlNavigation: 'reload',
                skipLocationChange: true,
            });
        });
    }

    OnUnregisterFromCourse(registration: StudentCourseRegistration): void {
        this._apiService.unregisterForCourse(registration, registration.course.name).subscribe((isDeleted) => {
            if (isDeleted) {
                this._appService.displayInfoSnackbar(`Unregistered student from ${registration.course.name}`);

                this._router.navigateByUrl(this._router.url, {
                    onSameUrlNavigation: 'reload',
                    skipLocationChange: true,
                });
            }
        });
    }
}
