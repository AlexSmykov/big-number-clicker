import { Component, inject, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { AsyncPipe } from '@angular/common';

import { ResourcesService } from 'src/app/core/resources/resources.service';
import { PrestigeService } from 'src/app/core/prestige/prestige.service';
import { EResources } from 'src/app/core/resources/resources.enum';

@Component({
  selector: 'app-prestige-page',
  templateUrl: './prestige-page.component.html',
  styleUrls: ['./prestige-page.component.scss'],
  standalone: true,
  imports: [SvgIconComponent, AsyncPipe],
})
export default class PrestigePageComponent {
  private readonly resourceService = inject(ResourcesService);
  private readonly prestigeService = inject(PrestigeService);

  readonly prestigeButtonSelected = signal(false);

  readonly currentPrestigeBorder$ = this.prestigeService.currentPrestigeBorder$;
  readonly availableToPrestige$ =
    this.prestigeService.availableToPrestigeByBorder$;
  readonly availablePrestigePoints$ =
    this.prestigeService.availablePrestigePointOnPrestige$;
  readonly currentPrestigePoints$ = this.resourceService.getResource$(
    EResources.PRESTIGE_POINT
  );
  readonly currentMoney$ = this.resourceService.getResource$(EResources.MONEY);

  prestige(): void {
    this.prestigeButtonSelected.set(false);
    this.prestigeService.prestige();
  }
}
