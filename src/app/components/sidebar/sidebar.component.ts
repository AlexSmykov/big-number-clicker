import { Component, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

import { SIDEBAR_BUTTONS } from 'src/app/components/sidebar/sidebar.const';
import { EFullRoutes } from 'src/app/core/router-paths';
import { JoinPipe } from 'src/app/shared/pipes/join.pipe';
import { EPages } from 'src/app/components/sidebar/sidebar.enum';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';
import { AllInfoService } from 'src/app/core/all-info/all-info.service';
import { LocalStorageService } from 'src/app/core/storage/local-storage.service';

import { filter, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SvgIconComponent, RouterLink, JoinPipe, AsyncPipe],
})
export default class SidebarComponent {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly AllInfoService = inject(AllInfoService);

  readonly allInfo$ = this.AllInfoService.allInfoObject$;

  readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    )
  );
  readonly pageButtons = SIDEBAR_BUTTONS;
  readonly EFullRoutes = EFullRoutes;
  readonly EPages = EPages;
  readonly EUnlocks = EUnlocks;
  protected readonly Math = Math;

  resetGame(): void {
    this.localStorageService.clear();
    location.reload();
  }
}
