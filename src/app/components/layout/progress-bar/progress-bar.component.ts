import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [NgProgressbar, NgProgressRouter],
    template: ` <ng-progress ngProgressRouter [spinner]="true" spinnerPosition="right" /> `,
    styleUrl: './progress-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {}
