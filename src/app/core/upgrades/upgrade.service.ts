import { inject, Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { TUpgrade, TUpgrades } from 'src/app/core/upgrades/upgrade.interface';
import {
  UPGRADE_COST_GROW_FORMULAS,
  UPGRADES_START_CONFIG,
} from 'src/app/core/upgrades/upgrade.const';
import { EUpgradeBuyType, EUpgrades } from 'src/app/core/upgrades/upgrade.enum';
import { isExhausted, parseLoadedValue } from 'src/app/core/utils/core.utils';
import { TSavedValue } from 'src/app/core/interfaces/core.interface';
import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { UnlocksService } from 'src/app/core/unlocks/unlocks.service';
import { isOneTimeUpgrade } from 'src/app/core/upgrades/upgrade.utils';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';

import { BehaviorSubject, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpgradeService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly parametersService = inject(ParametersService);
  private readonly unlocksService = inject(UnlocksService);

  private readonly _upgrades$ = new BehaviorSubject<TUpgrades>(
    UPGRADES_START_CONFIG
  );

  private isHasSavedValue = false;

  constructor() {
    this.loadUpgrades();
  }

  updateValues(): void {
    this._upgrades$.next(this._upgrades$.getValue());
  }

  private loadUpgrades(): void {
    const foundValue = this.localStorageService.getItem(
      EStorageKeys.UPGRADES_STORAGE_ID
    );

    if (
      foundValue &&
      Object.keys(JSON.parse(foundValue)).length ===
        Object.keys(UPGRADES_START_CONFIG).length
    ) {
      this.isHasSavedValue = true;
      const parsedUpgrades = parseLoadedValue(
        JSON.parse(foundValue) as TSavedValue<TUpgrades>
      );
      this._upgrades$.next(
        Object.fromEntries(
          Object.entries(parsedUpgrades).map(([key, value]) => {
            return [
              key,
              {
                ...value,
                createTooltip:
                  UPGRADES_START_CONFIG[key as EUpgrades].createTooltip,
              },
            ];
          })
        ) as TUpgrades
      );
    }
  }

  saveUpgrades(): void {
    if (
      this.isHasSavedValue ===
      this.localStorageService.checkItem(EStorageKeys.UPGRADES_STORAGE_ID)
    ) {
      this.localStorageService.setItem(
        EStorageKeys.UPGRADES_STORAGE_ID,
        JSON.stringify(this._upgrades$.getValue())
      );
    }
  }

  getUpgrade$(upgradeKey: EUpgrades): Observable<TUpgrade> {
    return this._upgrades$.pipe(map((upgrades) => upgrades[upgradeKey]));
  }

  getAllUpgrades$(): Observable<TUpgrades> {
    return this._upgrades$.asObservable();
  }

  upgrade(upgradeKey: EUpgrades) {
    this.parametersService
      .getAllParameters$()
      .pipe(take(1))
      .subscribe((parameters) => {
        const upgrades = this._upgrades$.getValue();
        const upgrade = upgrades[upgradeKey];
        this.updateCosts(upgrade);

        if (isOneTimeUpgrade(upgrade)) {
          upgrade.bought = true;
        }

        switch (upgradeKey) {
          case EUpgrades.SIMPLE_MULTIPLIER:
            parameters.simpleMultiplier.value.plus(
              parameters.simpleMultiplierCoefficient.value
            );
            break;

          case EUpgrades.SIMPLE_MULTIPLIER_BOOST:
            parameters.simpleMultiplier.value.multiply(
              parameters.simpleMultiplierIncrease.value
            );
            parameters.simpleMultiplierCoefficient.value.multiply(
              parameters.simpleMultiplierCoefficientIncrease.value
            );
            break;

          case EUpgrades.CRYSTAL_CHANCE:
            parameters.crystalChance.value +=
              parameters.crystalChanceIncrease.value;
            break;

          case EUpgrades.CRYSTAL_MULTIPLIER:
            parameters.crystalMultiplier.value.multiply(
              parameters.crystalMultiplierCoefficient.value
            );
            break;

          case EUpgrades.LOG_MULTIPLIER_BASE:
            parameters.logMultiplierBase.value =
              (parameters.logMultiplierBase.value - 1) /
                parameters.logMultiplierBaseDecrease.value +
              1;
            break;

          case EUpgrades.LOG_MULTIPLIER_POWER:
            parameters.logMultiplierPower.value.plus(
              parameters.logMultiplierPowerIncrease.value
            );
            break;

          case EUpgrades.CRYSTAL_CHANCE_BY_MONEY:
            parameters.crystalChance.value +=
              parameters.crystalChanceMoneyIncrease.value;
            break;

          case EUpgrades.UNLOCK_CRYSTALS:
            this.unlocksService.setLock(true, EUnlocks.CRYSTALS);
            parameters.clickButtonText.value = 'Crystal age are coming';

            upgrades[EUpgrades.UNLOCK_SETTINGS_AND_ABOUT].isUnlocked = true;
            upgrades[EUpgrades.UNLOCK_PRESTIGE].isUnlocked = true;
            upgrades[EUpgrades.UNLOCK_LOG_MULTIPLIER].isUnlocked = true;
            upgrades[EUpgrades.CRYSTAL_MULTIPLIER].isUnlocked = true;
            upgrades[EUpgrades.CRYSTAL_CHANCE].isUnlocked = true;

            break;

          case EUpgrades.UNLOCK_SETTINGS_AND_ABOUT:
            this.unlocksService.setLock(true, EUnlocks.SETTINGS_AND_ABOUT);
            break;

          case EUpgrades.UNLOCK_LOG_MULTIPLIER:
            this.unlocksService.setLock(true, EUnlocks.LOG_MULTIPLIER);
            parameters.clickButtonText.value = 'log(money)';

            upgrades[EUpgrades.LOG_MULTIPLIER_BASE].isUnlocked = true;
            upgrades[EUpgrades.LOG_MULTIPLIER_POWER].isUnlocked = true;

            break;

          case EUpgrades.UNLOCK_PRESTIGE:
            this.unlocksService.setLock(true, EUnlocks.PRESTIGE);
            parameters.clickButtonText.value = 'Now you can reset';

            upgrades[EUpgrades.PRESTIGE_MULTIPLIER].isUnlocked = true;
            upgrades[EUpgrades.SIMPLE_MULTIPLIER_POWER].isUnlocked = true;
            upgrades[EUpgrades.START_FLAT_BONUS].isUnlocked = true;
            upgrades[EUpgrades.UNLOCK_RUBIES].isUnlocked = true;
            upgrades[EUpgrades.UNLOCK_MORE_UPGRADES_1].isUnlocked = true;

            break;

          case EUpgrades.UNLOCK_RUBIES:
            this.unlocksService.setLock(true, EUnlocks.RUBY);
            parameters.clickButtonText.value = 'Red crystals lol';

            upgrades[EUpgrades.MULTIPLY_CRYSTAL_GAIN].isUnlocked = true;
            upgrades[EUpgrades.CRYSTAL_MULTIPLIER_COEFFICIENT].isUnlocked =
              true;

            break;

          case EUpgrades.FLAT_BONUS:
            parameters.flatBonus.value.plus(parameters.flatBonusUpgrade1.value);
            break;

          case EUpgrades.CRYSTAL_MULTIPLIER_COEFFICIENT:
            parameters.crystalMultiplierCoefficient.value.plus(
              parameters.crystalMultiplierCoefficientIncrease.value
            );
            break;

          case EUpgrades.SIMPLE_MULTIPLIER_POWER:
            parameters.simpleMultiplierPower.value.plus(
              parameters.simpleMultiplierPowerCoefficient.value
            );
            break;

          case EUpgrades.CRYSTAL_CHANCE_ON_PRESTIGE:
            parameters.crystalChanceOnPrestige.value +=
              parameters.crystalChanceOnPrestigeCoefficient.value;
            break;

          case EUpgrades.START_FLAT_BONUS:
            parameters.flatBonusStart.value.plus(
              parameters.flatBonusStartCoefficient.value
            );
            break;

          case EUpgrades.MULTIPLY_CRYSTAL_GAIN:
            parameters.crystalGainMultiplier.value.plus(
              parameters.rubyCristalGainMultiplier.value
            );
            break;

          case EUpgrades.PRESTIGE_MULTIPLIER:
            parameters.prestigeMultiplier.value.plus(
              parameters.prestigeMultiplierCoefficient.value
            );
            break;

          case EUpgrades.UNLOCK_MORE_UPGRADES_1:
            this.unlocksService.setLock(true, EUnlocks.MORE_UPGRADES_1);

            upgrades[EUpgrades.FLAT_BONUS].isUnlocked = true;
            upgrades[EUpgrades.CRYSTAL_CHANCE_ON_PRESTIGE].isUnlocked = true;
            upgrades[EUpgrades.CRYSTAL_CHANCE_BY_MONEY].isUnlocked = true;
            break;

          default:
            isExhausted(upgradeKey);
        }

        this.parametersService.setParameters(parameters);
        this._upgrades$.next(upgrades);
      });
  }

  private updateCosts(upgrade: TUpgrade): void {
    if (isOneTimeUpgrade(upgrade)) {
      return;
    }

    upgrade.count++;
    if (
      upgrade.caps.length > upgrade.currentCap + 1 &&
      upgrade.caps[upgrade.currentCap + 1].startAtCount <= upgrade.count
    ) {
      upgrade.currentCap++;
      return;
    }

    let costs = upgrade.caps[upgrade.currentCap].costs;
    costs.forEach((cost) =>
      UPGRADE_COST_GROW_FORMULAS[cost.growthFormula](cost, upgrade.count)
    );
  }

  resetUpgrade(upgradeKey: EUpgrades): void {
    this.getAllUpgrades$()
      .pipe(take(1))
      .subscribe((upgrades) => {
        const upgrade = upgrades[upgradeKey];
        switch (upgrade.buyType) {
          case EUpgradeBuyType.ENDLESS:
          case EUpgradeBuyType.WITH_COUNT:
            upgrade.currentCap = 0;
            upgrade.count = 0;
            upgrade.caps.forEach((cap) => {
              cap.costs.forEach((cost) => {
                cost.cost = cost.startCost.copy();
              });
            });
            break;

          case EUpgradeBuyType.ONE_TIME:
            upgrade.bought = false;
            break;
        }
      });
  }
}
