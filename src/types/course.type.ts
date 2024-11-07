import { StudentCourseRegistration } from './student-course-registration.type';
import { TimestampAuditable } from './timestamp-auditable.type';

export enum CourseCategory {
    ART = 'ART',
    ENGLISH = 'ENGLISH',
    HISTORY = 'HISTORY',
    MATH = 'MATH',
    OTHER = 'OTHER',
    SCIENCE = 'SCIENCE',
}

export type Course = {
    id: string;
    category: CourseCategory;
    categoryIdentifier: number;
    name: string;
    registrations: StudentCourseRegistration[];
} & TimestampAuditable;
