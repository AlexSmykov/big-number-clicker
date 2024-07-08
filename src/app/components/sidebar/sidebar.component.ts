import { Component, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { SIDEBAR_BUTTONS } from 'src/app/components/sidebar/sidebar.const';
import { EFullRoutes } from 'src/app/core/router-paths';
import { JoinPipe } from 'src/app/shared/pipes/join.pipe';

import { filter, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SvgIconComponent, RouterLink, JoinPipe],
})
export default class SidebarComponent {
  private readonly router = inject(Router);

  readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    )
  );
  readonly buttons = SIDEBAR_BUTTONS;
  readonly EFullRoutes = EFullRoutes;
}
