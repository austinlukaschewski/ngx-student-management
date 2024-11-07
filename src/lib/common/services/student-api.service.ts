import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { assign } from 'lodash';
import { map, Observable, of, switchMap, take } from 'rxjs';

import { ConfirmationDialogComponent } from '@/lib/common/dialogs/confirmation/confirmation.component';
import { ApiService } from '@/lib/common/services/api.service';
import { CourseRegistrationComponent } from '@/lib/students/dialogs/course-registration/course-registration.component';
import { StudentProfileDialogComponent } from '@/lib/students/dialogs/student-profile/student-profile.component';
import type { Student } from '@/types/student.type';
import { StudentCourseRegistration } from '@/types/student-course-registration.type';

@Injectable()
export class StudentApiService {
    private readonly _api = inject(ApiService);
    private readonly _dialog = inject(MatDialog);

    createStudent(): Observable<Student | undefined> {
        return this._dialog
            .open(StudentProfileDialogComponent, {
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

                    return this._api.post<Student>(`students`, result);
                }),
            );
    }

    updateStudent(student: Student): Observable<Student | undefined> {
        return this._dialog
            .open(StudentProfileDialogComponent, {
                minWidth: '400px',
                data: {
                    type: 'Edit',
                    student,
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                switchMap((result) => {
                    if (!result) return of(undefined);

                    const data = assign(student, result);
                    console.log(data);
                    return this._api.put<Student>(`students/${result.id}`, data);
                }),
            );
    }

    deleteStudent(student: Student): Observable<boolean | undefined> {
        return this._dialog
            .open(ConfirmationDialogComponent, {
                data: {
                    message: `Are you sure you want to delete <span class="font-semibold">${student.firstName} ${student.lastName}</span> (${student.email})?<br /><span class="font-bold">This action is not reversible.<span>`,
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                map((shouldDelete) => {
                    if (!shouldDelete) return undefined;

                    return student.id;
                }),
                switchMap((id) => {
                    if (!id) return of(undefined);

                    return this._api.post<boolean>(`students/${id}/delete`);
                }),
            );
    }

    registerForCourse(student: Student): Observable<StudentCourseRegistration | undefined> {
        return this._dialog
            .open(CourseRegistrationComponent, {
                data: {
                    student,
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                switchMap((data) => {
                    if (!data) return of(undefined);

                    return this._api.post<StudentCourseRegistration>(`students/courses/register`, data);
                }),
            );
    }

    unregisterForCourse(registration: StudentCourseRegistration, name: string): Observable<boolean> {
        return this._dialog
            .open(ConfirmationDialogComponent, {
                data: {
                    message: `Are you sure you want to unregister <span class="font-semibold">${name}</span>?<br /><span class="font-bold">This action is not reversible.<span>`,
                },
            })
            .afterClosed()
            .pipe(
                take(1),
                map((shouldDelete) => {
                    if (!shouldDelete) return undefined;

                    return registration.id;
                }),
                switchMap((id) => {
                    if (!id) return of(false);

                    return this._api.post<boolean>(`students/courses/unregister`, id);
                }),
            );
    }
}
