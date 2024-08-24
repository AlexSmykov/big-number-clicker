import { inject, Injectable } from '@angular/core';

import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { rollChanceMultiple } from 'src/app/core/utils/core.utils';
import { AllInfoService } from 'src/app/core/all-info/all-info.service';

import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  switchMap,
  take,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private readonly allInfoService = inject(AllInfoService);

  private readonly _nextClickMoneyGain$ = new BehaviorSubject<BigNumber>(
    new BigNumber(0)
  );

  private readonly _nextClickMoneyTrigger$ = new Subject<void>();

  get nextClickMoneyGain$(): Observable<BigNumber> {
    return this._nextClickMoneyGain$.asObservable();
  }

  get clickButtonText$(): Observable<string> {
    return this.allInfoService.allInfo$.pipe(
      map(([_, parameters]) => parameters.clickButtonText.value)
    );
  }

  constructor() {
    this.subOnInfoChanges();
    this.subOnNextClickMoneyTrigger();

    this._nextClickMoneyTrigger$.next();
  }

  subOnInfoChanges(): void {
    this.allInfoService.allInfo$.subscribe(() => {
      this._nextClickMoneyTrigger$.next();
    });
  }

  subOnNextClickMoneyTrigger(): void {
    this._nextClickMoneyTrigger$
      .pipe(switchMap(() => this.allInfoService.allInfo$))
      .subscribe(([_, parameters, resources, unlocks]) => {
        const baseValue = parameters.baseMoneyRate.value.copy();

        baseValue.multiply(
          parameters.simpleMultiplier.value
            .copy()
            .pow(parameters.simpleMultiplierPower.value)
        );
        baseValue.multiply(parameters.crystalMultiplier.value);
        baseValue.multiply(parameters.prestigeMultiplier.value);

        if (unlocks.LOG_MULTIPLIER && resources.MONEY.moreThanOrEqual(1)) {
          baseValue.multiply(
            resources.MONEY.copy()
              .plus(1)
              .log(parameters.logMultiplierBase.value)
              .pow(parameters.logMultiplierPower.value)
          );
        }

        if (unlocks.RUBY_BASED_MULTIPLIER) {
          baseValue.multiply(resources.RUBY.copy().plus(1));
        }

        baseValue.plus(parameters.flatBonus.value);
        baseValue.plus(parameters.flatBonusStart.value);

        this._nextClickMoneyGain$.next(baseValue);
      });
  }

  onClick(): void {
    this.allInfoService.allInfo$
      .pipe(take(1))
      .subscribe(([_, parameters, resources, unlocks]) => {
        // Money

        resources.MONEY.plus(this._nextClickMoneyGain$.getValue());

        // Crystals
        if (unlocks.CRYSTALS) {
          const rolledCrystals = rollChanceMultiple(
            (parameters.crystalChance.value +
              parameters.crystalChanceByPrestige.value) *
              parameters.baseCrystalChanceRate.value
          );

          if (rolledCrystals) {
            resources.CRYSTAL.plus(
              parameters.baseCrystalRate.value
                .copy()
                .multiply(parameters.crystalGainMultiplier.value)
                .multiply(rolledCrystals)
            );

            // Rubies
            if (unlocks.RUBY) {
              const rolledRubies = rollChanceMultiple(
                parameters.rubyChance.value *
                  parameters.baseRubyChanceRate.value *
                  rolledCrystals
              );

              if (rolledRubies) {
                resources.RUBY.plus(parameters.baseRubyRate.value).multiply(
                  rolledRubies
                );
              }
            }
          }
        }

        this.allInfoService.updateResources();
      });
  }
}
