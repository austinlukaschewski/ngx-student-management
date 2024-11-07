import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';

import { isNil } from 'lodash';
import { map } from 'rxjs';

import { ApiService } from '@/lib/common/services/api.service';
import { AppService } from '@/lib/common/services/app.service';
import type { Student } from '@/types/student.type';

export const studentResolverFn: ResolveFn<Student> = (route: ActivatedRouteSnapshot) => {
    const appService = inject(AppService);
    const router = inject(Router);

    const id = route.paramMap.get('id');
    if (isNil(id)) {
        appService.displayErrorSnackbar('No student ID provided');
        router.navigateByUrl('/');
    }

    return inject(ApiService)
        .get<Student>(`students/${id}`)
        .pipe(
            map((response) => {
                if (isNil(response)) {
                    appService.displayErrorSnackbar('Student not found');
                    router.navigateByUrl('/');
                }

                return response;
            }),
        );
};
