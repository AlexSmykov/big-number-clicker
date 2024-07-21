import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import ResourcesComponent from 'src/app/components/resources/resources.component';
import UpgradeComponent from 'src/app/pages/upgrades/components/upgrade/upgrade.component';
import { UpgradeService } from 'src/app/core/upgrades/upgrade.service';
import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { UnlocksService } from 'src/app/core/unlocks/unlocks.service';
import {
  EUpgrades,
  EUpgradeTier,
  EUpgradeType,
} from 'src/app/core/upgrades/upgrade.enum';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import {
  isCountableUpgrade,
  isEndlessUpgrade,
  isOneTimeUpgrade,
} from 'src/app/core/upgrades/upgrade.utils';
import { TUpgrade } from 'src/app/core/upgrades/upgrade.interface';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';
import { EResources } from 'src/app/core/resources/resources.enum';
import { RESOURCE_DATA } from 'src/app/core/resources/resources.const';
import { TIER_COLORS } from 'src/app/core/upgrades/upgrade.const';

import { BehaviorSubject, combineLatest, map, take } from 'rxjs';

@Component({
  selector: 'app-upgrades-page',
  templateUrl: './upgrades-page.component.html',
  styleUrls: ['./upgrades-page.component.scss'],
  standalone: true,
  imports: [ResourcesComponent, UpgradeComponent, AsyncPipe],
})
export default class UpgradesPageComponent {
  private readonly upgradeService = inject(UpgradeService);
  private readonly resourcesService = inject(ResourcesService);
  private readonly parametersService = inject(ParametersService);
  private readonly unlocksService = inject(UnlocksService);

  readonly unlocks = toSignal(this.unlocksService.getAllUnlocks$());

  readonly isOneTimeUpgrade = isOneTimeUpgrade;
  readonly isCountableUpgrade = isCountableUpgrade;
  readonly isEndlessUpgrade = isEndlessUpgrade;

  readonly RESOURCE_DATA = RESOURCE_DATA;
  readonly TIER_COLORS = TIER_COLORS;

  readonly EUpgradeType = EUpgradeType;
  readonly EUnlocks = EUnlocks;
  readonly EUpgradeTier = EUpgradeTier;
  readonly EResources = EResources;

  private readonly tierFilter$ = new BehaviorSubject<EUpgradeTier | null>(null);
  private readonly typeFilter$ = new BehaviorSubject<EUpgradeType | null>(null);

  typeFilterValue = toSignal(this.typeFilter$);
  tierFilterValue = toSignal(this.tierFilter$);

  upgrades$ = combineLatest([
    this.upgradeService.getAllUpgrades$(),
    this.parametersService.getAllParameters$(),
    this.unlocksService.getAllUnlocks$(),
    this.tierFilter$,
    this.typeFilter$,
  ]).pipe(
    map(([upgrades, parameters, unlocks, tierFilter, typeFilter]) =>
      Object.entries(upgrades)
        .map(
          ([key, value]): TUpgrade & {
            key: EUpgrades;
            tooltip: string | undefined;
          } => {
            return {
              ...value,
              key: key as EUpgrades,
              tooltip: upgrades[key as EUpgrades].createTooltip(parameters),
            };
          }
        )
        .filter((item) => (tierFilter ? item.tier === tierFilter : true))
        .filter((item) => (typeFilter ? item.type === typeFilter : true))
    )
  );

  buyUpgrade(upgradeKey: EUpgrades): void {
    this.upgradeService
      .getUpgrade$(upgradeKey)
      .pipe(take(1))
      .subscribe((upgrade) => {
        if (isOneTimeUpgrade(upgrade)) {
          this.resourcesService.spentResources(upgrade.costs);
        } else {
          this.resourcesService.spentResources(
            upgrade.caps[upgrade.currentCap].costs
          );
        }

        this.upgradeService.upgrade(upgradeKey);
      });
  }

  setTierFilter(value: EUpgradeTier | null): void {
    this.tierFilter$.next(value);
  }

  setTypeFilter(value: EUpgradeType | null): void {
    this.typeFilter$.next(value);
  }
}
