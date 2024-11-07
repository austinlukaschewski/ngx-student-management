import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ApiService } from '@/lib/common/services/api.service';
import type { Course } from '@/types/course.type';

export const allCoursesResolverFn: ResolveFn<Course[]> = () => inject(ApiService).get<Course[]>('courses');
