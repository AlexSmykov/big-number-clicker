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

        if (unlocks.CRYSTALS && rollChance(parameters.crystalChance)) {
          const crystals = resources.CRYSTAL.copy();
          crystals.plus(
            parameters.baseCrystalRate.multiply(parameters.crystalMultiplier)
          );
          this.resourcesService.setResource(crystals, EResources.CRYSTAL);

          if (unlocks.RUBY && rollChance(parameters.rubyChance)) {
            const rubys = resources.RUBY.copy();
            rubys.plus(parameters.baseRubyRate);
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
      const baseValue = parameters.baseMoneyRate.copy();

      baseValue.multiply(
        parameters.simpleMultiplier.copy().pow(parameters.simpleMultiplierPower)
      );
      baseValue.multiply(parameters.crystalMultiplier);
      baseValue.multiply(parameters.prestigeMultiplier);

      if (unlocks.LOG_MULTIPLIER) {
        const moneyBigNumber = resources.MONEY.copy();
        moneyBigNumber.log(parameters.logMultiplierBase);
        baseValue.multiply(moneyBigNumber);
      }

      baseValue.plus(parameters.flatBonus);

      this._nextClickMoneyGain$.next(baseValue);
    });
  }
}
