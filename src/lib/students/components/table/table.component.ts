import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Student } from '@/types/student.type';

@Component({
    selector: 'app-students-table',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatTableModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class StudentsTableComponent {
    data = input.required<any[]>();
    dataSource = computed(() => new MatTableDataSource<any>(this.data()));
    columns = [
        {
            label: 'First Name',
            field: 'firstName',
        },
        {
            label: 'Last Name',
            field: 'lastName',
        },
        {
            label: 'Email',
            field: 'email',
        },
    ];
    displayedColumns = ['firstName', 'lastName', 'email', 'viewAction', 'editAction', 'deleteAction'];

    updateStudent = output<Student>();
    deleteStudent = output<Student>();
}
