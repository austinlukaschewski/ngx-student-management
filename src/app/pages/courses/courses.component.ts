import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { size } from 'lodash';
import { map } from 'rxjs';
import { CourseApiService } from '@/lib/common/services/course-api.service';

import { CourseIdentifierPipe } from '@/lib/common/pipes/course-identifier.pipe';
import { AppService } from '@/lib/common/services/app.service';
import { Course } from '@/types/course.type';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, CourseIdentifierPipe],
    providers: [CourseApiService],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
})
export class CoursesComponent {
    private readonly _apiService = inject(CourseApiService);
    private readonly _appService = inject(AppService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);

    courses$ = this._route.data.pipe(map((data) => data['courses']));
    coursesCount$ = this.courses$.pipe(map((courses) => size(courses)));

    onRegisterNewCourse(): void {
        this._apiService.createCourse().subscribe((course) => {
            if (!course) return;

            this._router.navigate([course.id], { relativeTo: this._route });
        });
    }

    onUpdateCourse(course: Course): void {
        this._apiService.updateCourse(course).subscribe((course) => {
            if (!course) return;

            this._appService.displayInfoSnackbar('Updated course information');

            this._router.navigate([this._router.url], { onSameUrlNavigation: 'reload', skipLocationChange: true });
        });
    }

    onDeleteCourse(course: Course): void {
        this._apiService.deleteCourse(course).subscribe((isDeleted) => {
            if (isDeleted) {
                this._router.navigate([this._router.url], {
                    skipLocationChange: true,
                    onSameUrlNavigation: 'reload',
                });
            }
        });
    }
}
