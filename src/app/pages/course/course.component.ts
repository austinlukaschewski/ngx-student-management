import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { map } from 'rxjs';
import { CourseApiService } from '@/lib/common/services/course-api.service';
import { StudentApiService } from '@/lib/common/services/student-api.service';

import { CourseIdentifierPipe } from '@/lib/common/pipes/course-identifier.pipe';
import { StudentNamePipe } from '@/lib/common/pipes/student-name.pipe';
import { AppService } from '@/lib/common/services/app.service';
import { StudentCourseRegistration } from '@/types/student-course-registration.type';
import { StudentNameStyle } from '@/types/student-name-style.enum';

@Component({
    selector: 'app-course',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatTableModule,
        CourseIdentifierPipe,
        StudentNamePipe,
    ],
    providers: [CourseApiService, StudentApiService],
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss',
})
export class CourseComponent {
    private readonly _api = inject(CourseApiService);
    private readonly _appService = inject(AppService);
    private readonly _studentApi = inject(StudentApiService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);

    readonly displayedColumns = ['studentName', 'studentEmail', 'viewAction', 'deleteAction'];

    get StudentNameStyle() {
        return StudentNameStyle;
    }

    course$ = this._route.data.pipe(map((data) => data['course']));

    onUnregisterStudent(registration: StudentCourseRegistration): void {
        const { firstName, lastName } = registration.student;
        this._studentApi.unregisterForCourse(registration, `${firstName} ${lastName}`).subscribe((isDeleted) => {
            if (isDeleted) {
                this._appService.displayInfoSnackbar(`Unregistered ${firstName} ${lastName}`);

                this._router.navigateByUrl(this._router.url, {
                    onSameUrlNavigation: 'reload',
                    skipLocationChange: true,
                });
            }
        });
    }
}
