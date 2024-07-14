import { inject, Injectable } from '@angular/core';

import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { EResources } from 'src/app/core/resources/resources.enum';
import { rollChance } from 'src/app/core/utils/core.utils';
import { UnlocksService } from 'src/app/core/unlocks/unlocks.service';

import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private parametersService = inject(ParametersService);
  private resourcesService = inject(ResourcesService);
  private unlocksService = inject(UnlocksService);

  private readonly _nextClickMoneyGain$ = new BehaviorSubject<BigNumber>(
    new BigNumber(0)
  );

  get nextClickMoneyGain$(): Observable<BigNumber> {
    return this._nextClickMoneyGain$.asObservable();
  }

  get clickButtonText$(): Observable<string> {
    return this.parametersService
      .getAllParameters$()
      .pipe(map((parameters) => parameters.clickButtonText));
  }

  constructor() {
    this.calculateNextMoneyGain();
  }

  onClick(): void {
    combineLatest([
      this.parametersService.getAllParameters$(),
      this.resourcesService.getAllResources$(),
      this.unlocksService.getAllUnlocks$(),
    ])
      .pipe(take(1))
      .subscribe(([parameters, resources, unlocks]) => {
        const money = resources.MONEY.copy();
        money.plus(this._nextClickMoneyGain$.getValue());
        this.resourcesService.setResource(money, EResources.MONEY);

        if (rollChance(parameters.crystalChance)) {
          const crystals = resources.CRYSTAL.copy();
          crystals.plus(1);
          this.resourcesService.setResource(crystals, EResources.CRYSTAL);

          if (unlocks.IS_RUBYS_UNLOCK && rollChance(parameters.rubyChance)) {
            const rubys = resources.RUBY.copy();
            rubys.plus(1);
            this.resourcesService.setResource(rubys, EResources.RUBY);
          }
        }

        this.calculateNextMoneyGain();
      });
  }

  private calculateNextMoneyGain(): void {
    combineLatest([
      this.parametersService.getAllParameters$(),
      this.resourcesService.getAllResources$(),
      this.unlocksService.getAllUnlocks$(),
    ]).subscribe(([parameters, resources, unlocks]) => {
      const baseValue = parameters.baseRate.copy();

      if (baseValue.currentValue > 1) {
        baseValue.pow(parameters.simplePower);
      }
      baseValue.multiply(parameters.simpleMultiplier);
      baseValue.multiply(parameters.crystalMultiplier);

      if (unlocks.IS_LOG_MULTIPLIER_UNLOCK) {
        const moneyBigNumber = resources.MONEY.copy();
        moneyBigNumber.log(parameters.logMultiplierBase);
        baseValue.multiply(moneyBigNumber);
      }

      this._nextClickMoneyGain$.next(baseValue);
    });
  }
}
