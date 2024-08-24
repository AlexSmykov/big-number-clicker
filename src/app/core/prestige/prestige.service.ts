import { inject, Injectable } from '@angular/core';

import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { UpgradeService } from 'src/app/core/upgrades/upgrade.service';
import { TParameters } from 'src/app/core/parameters/parameters.interface';
import { UPGRADES_START_CONFIG } from 'src/app/core/upgrades/upgrade.const';
import { EUpgrades } from 'src/app/core/upgrades/upgrade.enum';
import { PARAMETERS_START_CONFIG } from 'src/app/core/parameters/parameters.const';
import { AllInfoService } from 'src/app/core/all-info/all-info.service';

import { combineLatestWith, map, Observable, Subject, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrestigeService {
  private parametersService = inject(ParametersService);
  private upgradeService = inject(UpgradeService);

  private allInfoService = inject(AllInfoService);

  readonly isPrestige$ = new Subject<void>();

  get availablePrestigePointOnPrestige$(): Observable<BigNumber> {
    return this.allInfoService.allInfo$.pipe(
      map(([_, parameters, resources]) => {
        return resources.MONEY.copy()
          .log10()
          .pow(parameters.prestigePointsGainPower.value);
      })
    );
  }

  get currentPrestigeBorder$(): Observable<BigNumber> {
    return this.allInfoService.allInfo$.pipe(
      map(([_, parameters, resources]) => {
        return parameters.prestigeBorder.value
          .copy()
          .pow(parameters.prestigeBorderGrowth.value)
          .divide(parameters.prestigeBorderDecrease.value);
      })
    );
  }

  get availableToPrestigeByBorder$(): Observable<boolean> {
    return this.allInfoService.allInfo$.pipe(
      combineLatestWith(this.currentPrestigeBorder$),
      map(([[_, __, resources], currentBorder]) => {
        return resources.MONEY.moreThanOrEqual(currentBorder);
      })
    );
  }

  prestige(): void {
    this.allInfoService.allInfo$
      .pipe(combineLatestWith(this.availablePrestigePointOnPrestige$), take(1))
      .subscribe(
        ([
          [upgrades, parameters, resources, unlocks],
          availablePrestigePoints,
        ]) => {
          resources.PRESTIGE_POINT.plus(availablePrestigePoints);
          resources.MONEY = new BigNumber(0);
          resources.CRYSTAL = new BigNumber(0);
          resources.RUBY = new BigNumber(0);

          Object.entries(UPGRADES_START_CONFIG)
            .filter(([_, value]) => value.isResetOnPrestige)
            .map(([key]) => key)
            .forEach((upgradeKey) => {
              this.upgradeService.resetUpgrade(upgradeKey as EUpgrades);
            });

          Object.entries(PARAMETERS_START_CONFIG)
            .filter(([_, value]) => value.isResetOnPrestige)
            .map(([key]) => key)
            .forEach((parameterKey) => {
              this.parametersService.resetParameter(
                parameterKey as keyof TParameters
              );
            });

          parameters.crystalChanceOnPrestige.value +=
            parameters.crystalChanceOnPrestigeCoefficient.value;
          parameters.crystalChanceOnPrestigeCoefficient.value +=
            parameters.crystalChanceOnPrestigeCoefficientIncrease.value;

          parameters.prestigeBorderGrowth.value.multiply(
            parameters.prestigeBorderGrowthCoefficient.value
          );
          ``;

          unlocks.LOG_MULTIPLIER = false;
          upgrades.LOG_MULTIPLIER_POWER.isUnlocked = false;
          upgrades.LOG_MULTIPLIER_BASE.isUnlocked = false;

          this.isPrestige$.next();
          this.allInfoService.updateAll();
        }
      );
  }
}
