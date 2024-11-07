import type { Course } from './course.type';
import type { Student } from './student.type';
import { TimestampAuditable } from './timestamp-auditable.type';

export type StudentCourseRegistration = {
    id: number;
    student: Student;
    course: Course;
} & TimestampAuditable;
