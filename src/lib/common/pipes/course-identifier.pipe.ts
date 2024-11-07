import { Pipe, PipeTransform } from '@angular/core';

import { isNil } from 'lodash';

import type { Course } from '@/types/course.type';

@Pipe({
    name: 'courseIdentifier',
    standalone: true,
})
export class CourseIdentifierPipe implements PipeTransform {
    transform(course: Course): string {
        if (isNil(course)) {
            return '-';
        }

        return `${course.category.substring(0, 3).toUpperCase()}${course.categoryIdentifier}`;
    }
}
