import { StudentCourseRegistration } from './student-course-registration.type';
import { TimestampAuditable } from './timestamp-auditable.type';

export type Student = {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    registrations: StudentCourseRegistration[];
} & TimestampAuditable;
