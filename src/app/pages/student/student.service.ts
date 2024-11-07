import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

@Injectable()
export class StudentService {
    private readonly _route = inject(ActivatedRoute);

    student$ = this._route.data.pipe(map((data) => data['student']));
    student = toSignal(this.student$);
}
