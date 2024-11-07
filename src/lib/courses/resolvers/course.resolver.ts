import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';

import { isNil } from 'lodash';
import { map } from 'rxjs';

import { ApiService } from '@/lib/common/services/api.service';
import { AppService } from '@/lib/common/services/app.service';
import type { Course } from '@/types/course.type';

export const courseResolverFn: ResolveFn<Course> = (route: ActivatedRouteSnapshot) => {
    const appService = inject(AppService);
    const router = inject(Router);

    const id = route.paramMap.get('id');
    if (isNil(id)) {
        appService.displayErrorSnackbar('No course ID provided');
        router.navigateByUrl('/');
    }

    return inject(ApiService)
        .get<Course>(`courses/${id}`)
        .pipe(
            map((response) => {
                if (isNil(response)) {
                    appService.displayErrorSnackbar('Course not found');
                    router.navigateByUrl('/');
                }

                return response;
            }),
        );
};
