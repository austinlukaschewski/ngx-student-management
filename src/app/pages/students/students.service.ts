import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { size } from 'lodash';
import { map, shareReplay } from 'rxjs';

import { ApiService } from '@/lib/common/services/api.service';
import { AppService } from '@/lib/common/services/app.service';

@Injectable()
export class StudentsService {
    private readonly _api = inject(ApiService);
    private readonly _appService = inject(AppService);
    private readonly _dialog = inject(MatDialog);
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);

    students$ = this._route.data.pipe(map((data) => data['students']));
    studentCount$ = this.students$.pipe(
        map((students) => size(students)),
        shareReplay(1),
    );
}
