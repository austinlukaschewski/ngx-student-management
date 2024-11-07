import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { StudentApiService } from '../../../lib/common/services/student-api.service';

import { StudentsService } from './students.service';

import { AppService } from '@/lib/common/services/app.service';
import { StudentsTableComponent } from '@/lib/students/components/table/table.component';
import type { Student } from '@/types/student.type';

@Component({
    selector: 'app-students',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, StudentsTableComponent],
    providers: [StudentsService, StudentApiService],
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class StudentsComponent {
    private readonly _apiService = inject(StudentApiService);
    private readonly _appService = inject(AppService);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    readonly service = inject(StudentsService);

    onRegisterNewStudent(): void {
        this._apiService.createStudent().subscribe((student) => {
            if (!student) return;

            this._router.navigate([student.id], { relativeTo: this._route });
        });
    }

    onUpdateStudent(student: Student): void {
        this._apiService.updateStudent(student).subscribe(() => {
            this._appService.displayInfoSnackbar('Updated student profile');

            this._router.navigate([this._router.url], { onSameUrlNavigation: 'reload', skipLocationChange: true });
        });
    }

    onDeleteStudent(student: Student): void {
        this._apiService.deleteStudent(student).subscribe((isDeleted) => {
            if (isDeleted) {
                this._router.navigate([this._router.url], {
                    skipLocationChange: true,
                    onSameUrlNavigation: 'reload',
                });
            }
        });
    }
}
