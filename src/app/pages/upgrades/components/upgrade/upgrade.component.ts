import { Component, inject, input, output } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TippyDirective } from '@ngneat/helipopper';
import { toObservable } from '@angular/core/rxjs-interop';

import { TUpgrade } from 'src/app/core/upgrades/upgrade.interface';
import {
  isCountableUpgrade,
  isEndlessUpgrade,
  isOneTimeUpgrade,
} from 'src/app/core/upgrades/upgrade.utils';
import ResourceComponent from 'src/app/shared/components/resource/resource.component';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import { EResourcesData } from 'src/app/core/resources/resources.enum';
import { EUpgradeTierNames } from 'src/app/core/upgrades/upgrade.const';

import { combineLatest, map } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ResourceComponent, TippyDirective, JsonPipe],
})
export default class UpgradeComponent {
  readonly upgrade = input.required<TUpgrade>();
  readonly tooltipText = input<string | undefined>(undefined);

  readonly buy = output<void>();

  private readonly resourceService = inject(ResourcesService);

  readonly isOneTimeUpgrade = isOneTimeUpgrade;
  readonly isEndlessUpgrade = isEndlessUpgrade;
  readonly isCountableUpgrade = isCountableUpgrade;
  readonly EResourcesData = EResourcesData;
  readonly EUpgradeTierNames = EUpgradeTierNames;

  private readonly upgrade$ = toObservable(this.upgrade);

  availableToBuy$ = combineLatest([
    this.upgrade$,
    this.resourceService.getAllResources$(),
  ]).pipe(
    map(([upgrade, resources]) => {
      const costs = isOneTimeUpgrade(upgrade)
        ? upgrade.costs
        : upgrade.caps[upgrade.currentCap].costs;

      return costs.every((cost) =>
        resources[cost.resourceType].moreThanOrEqual(cost.cost)
      );
    })
  );

  onBuy(): void {
    this.buy.emit();
  }
}
