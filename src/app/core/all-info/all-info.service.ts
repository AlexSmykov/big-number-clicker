import { inject, Injectable } from '@angular/core';

import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import { UnlocksService } from 'src/app/core/unlocks/unlocks.service';
import { UpgradeService } from 'src/app/core/upgrades/upgrade.service';

import { combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AllInfoService {
  private readonly upgradeService = inject(UpgradeService);
  private readonly parametersService = inject(ParametersService);
  private readonly resourcesService = inject(ResourcesService);
  private readonly unlocksService = inject(UnlocksService);

  readonly allInfo$ = combineLatest([
    this.upgradeService.getAllUpgrades$(),
    this.parametersService.getAllParameters$(),
    this.resourcesService.getAllResources$(),
    this.unlocksService.getAllUnlocks$(),
  ]);

  readonly allInfoObject$ = this.allInfo$.pipe(
    map(([upgrades, parameters, resources, unlocks]) => {
      return {
        upgrades,
        parameters,
        resources,
        unlocks,
      };
    })
  );

  updateUpgrades(): void {
    this.upgradeService.updateValues();
  }

  updateParameters(): void {
    this.parametersService.updateValues();
  }

  updateResources(): void {
    this.resourcesService.updateValues();
  }

  updateUnlocks(): void {
    this.unlocksService.updateValues();
  }

  updateAll(): void {
    this.updateUpgrades();
    this.updateParameters();
    this.updateResources();
    this.updateUnlocks();
  }
}
