import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ApiService } from '@/lib/common/services/api.service';
import type { Student } from '@/types/student.type';

export const allActiveStudentsResolverFn: ResolveFn<Student[]> = () => inject(ApiService).get<Student[]>('students');
