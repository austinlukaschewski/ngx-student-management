import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { filter, map } from 'rxjs';

import { HeaderComponent } from './components/layout/header/header.component';
import { ProgressBarComponent } from './components/layout/progress-bar/progress-bar.component';

import type { NavItem } from '@/types/nav-item.type';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        HeaderComponent,
        ProgressBarComponent,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private readonly _router = inject(Router);

    #activeUrl = signal<string>('');
    activeUrl = this.#activeUrl.asReadonly();

    readonly links: NavItem[] = [
        {
            label: 'Students',
            routerLink: '/students',
            icon: 'groups',
        },
        {
            label: 'Courses',
            routerLink: '/courses',
            icon: 'school',
        },
    ];

    constructor() {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map((event) => event.urlAfterRedirects),
            )
            .subscribe((url) => {
                this.#activeUrl.set(url);
            });
    }
}
