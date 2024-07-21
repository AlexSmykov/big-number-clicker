import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import ResourcesComponent from 'src/app/components/resources/resources.component';
import UpgradeComponent from 'src/app/pages/upgrades/components/upgrade/upgrade.component';
import { UpgradeService } from 'src/app/core/upgrades/upgrade.service';
import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { UnlocksService } from 'src/app/core/unlocks/unlocks.service';
import { EUpgrades } from 'src/app/core/upgrades/upgrade.enum';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import { isOneTimeUpgrade } from 'src/app/core/upgrades/upgrade.utils';
import { TUpgrade } from 'src/app/core/upgrades/upgrade.interface';

import { combineLatest, map, take } from 'rxjs';

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

  readonly EUpgrades = EUpgrades;
  readonly isOneTimeUpgrade = isOneTimeUpgrade;

  upgrades$ = combineLatest([
    this.upgradeService.getAllUpgrades$(),
    this.parametersService.getAllParameters$(),
    this.unlocksService.getAllUnlocks$(),
  ]).pipe(
    map(([upgrades, parameters, unlocks]) =>
      Object.fromEntries<TUpgrade & { tooltip: string | undefined }>(
        Object.entries(upgrades).map(([key, value]) => {
          console.log(
            upgrades,
            key,
            upgrades[key as EUpgrades],
            upgrades[key as EUpgrades].createTooltip
          );
          return [
            key,
            {
              ...value,
              tooltip: upgrades[key as EUpgrades].createTooltip(parameters),
            },
          ];
        })
      )
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
}
