import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import type { NavItem } from '@/types/nav-item.type';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    openSidenav = output<void>();

    links = input.required<NavItem[]>();
}
