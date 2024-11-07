import { Pipe, PipeTransform } from '@angular/core';

import { isEmpty, isNil } from 'lodash';

import type { Student } from '@/types/student.type';
import { StudentNameStyle } from '@/types/student-name-style.enum';

@Pipe({
    name: 'studentName',
    standalone: true,
})
export class StudentNamePipe implements PipeTransform {
    transform(student: Student, style: StudentNameStyle): string {
        if (isNil(student)) {
            return '';
        }

        switch (style) {
            case StudentNameStyle.FIRST_LAST:
                return `${student.firstName} ${student.lastName}`;
            case StudentNameStyle.LAST_FIRST:
                return `${student.lastName}, ${student.firstName}`;
            case StudentNameStyle.FIRST_MIDDLE_LAST:
                return `${student.firstName} ${this.formatMiddleName(student.middleName)}${student.lastName}`;
            case StudentNameStyle.LAST_FIRST_MIDDLE:
                return `${student.lastName}, ${student.firstName} ${this.formatMiddleName(student.middleName, false)}`;
            case StudentNameStyle.FIRST_MIDDLE_INITIAL_LAST:
                return `${student.firstName} ${this.formatMiddleName(student.middleName?.charAt(0))}${student.lastName}`;
            case StudentNameStyle.LAST_FIRST_MIDDLE_INITIAL:
                return `${student.lastName}, ${student.firstName} ${this.formatMiddleName(student.middleName?.charAt(0), false)}`;
            default:
                return `${student.firstName} ${student.lastName}`;
        }
    }

    private formatMiddleName(middleNameOrChar: string | undefined, addSpaceAfter = true): string {
        return isEmpty(middleNameOrChar) || isNil(middleNameOrChar)
            ? ''
            : `${middleNameOrChar}${middleNameOrChar.length > 1 ? '' : '.'}${addSpaceAfter ? ' ' : ''}`;
    }
}
