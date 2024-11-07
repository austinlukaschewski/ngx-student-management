import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { assign } from 'lodash';
import { map, Observable, of, switchMap, take } from 'rxjs';

import { ConfirmationDialogComponent } from '@/lib/common/dialogs/confirmation/confirmation.component';
import { ApiService } from '@/lib/common/services/api.service';
import { CourseInformationDialog } from '@/lib/courses/dialogs/course-information/course-information.component';
import type { Course } from '@/types/course.type';

@Injectable()
export class CourseApiService {
    private readonly _api = inject(ApiService);
    private readonly _dialog = inject(MatDialog);

    getAll(): Observable<Course[]> {
        return this._api.get<Course[]>(`courses`);
    }

    createCourse(): Observable<Course | undefined> {
        return this._dialog
            .open(CourseInformationDialog, {
                minWidth: '400px',
                data: {
                    type: 'Create',
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                switchMap((result) => {
                    if (!result) return of(undefined);

                    return this._api.post<Course>(`courses`, result);
                }),
            );
    }

    updateCourse(course: Course): Observable<Course | undefined> {
        return this._dialog
            .open(CourseInformationDialog, {
                minWidth: '400px',
                data: {
                    type: 'Edit',
                    course,
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                switchMap((result) => {
                    if (!result) return of(undefined);

                    const data = assign(course, result);
                    return this._api.put<Course>(`courses/${result.id}`, data);
                }),
            );
    }

    deleteCourse(course: Course): Observable<boolean | undefined> {
        return this._dialog
            .open(ConfirmationDialogComponent, {
                data: {
                    message: `Are you sure you want to delete <span class="font-semibold">${course.name}</span>?<br /><span class="font-bold">This action is not reversible.<span>`,
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                map((shouldDelete) => {
                    if (!shouldDelete) return undefined;

                    return course.id;
                }),
                switchMap((id) => {
                    if (!id) return of(undefined);

                    return this._api.post<boolean>(`courses/${id}/delete`);
                }),
            );
    }
}
