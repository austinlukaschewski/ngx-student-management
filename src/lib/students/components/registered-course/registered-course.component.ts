import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { CourseIdentifierPipe } from '@/lib/common/pipes/course-identifier.pipe';
import { StudentCourseRegistration } from '@/types/student-course-registration.type';

@Component({
    selector: 'app-students-registered-course',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, CourseIdentifierPipe],
    templateUrl: './registered-course.component.html',
    styleUrl: './registered-course.component.scss',
})
export class StudentsRegisteredCourseComponent {
    registration = input.required<StudentCourseRegistration>();

    unregisterStudent = output<StudentCourseRegistration>();

    emitUnregisterStudent(registration: StudentCourseRegistration): void {
        this.unregisterStudent.emit(registration);
    }
}
