import { inject, Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { PARAMETERS_START_CONFIG } from 'src/app/core/parameters/parameters.const';
import { TParameters } from 'src/app/core/parameters/parameters.interface';
import { TSavedValue } from 'src/app/core/interfaces/core.interface';
import { parseLoadedValue } from 'src/app/core/utils/core.utils';
import { isBigNumber } from 'src/app/core/models/big-number/big-number.guard';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParametersService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly _parameters$ = new BehaviorSubject<TParameters>(
    PARAMETERS_START_CONFIG
  );

  private isHasSavedValue = false;

  constructor() {
    this.loadParameters();
  }

  updateValues(): void {
    this._parameters$.next(this._parameters$.getValue());
  }

  private loadParameters(): void {
    const foundValue = this.localStorageService.getItem(
      EStorageKeys.PARAMETERS_STORAGE_ID
    );

    if (
      foundValue &&
      Object.keys(JSON.parse(foundValue)).length ===
        Object.keys(PARAMETERS_START_CONFIG).length
    ) {
      this.isHasSavedValue = true;
      this._parameters$.next(
        parseLoadedValue(JSON.parse(foundValue) as TSavedValue<TParameters>)
      );
    }
  }

  saveParameters(): void {
    if (
      this.isHasSavedValue ===
      this.localStorageService.checkItem(EStorageKeys.PARAMETERS_STORAGE_ID)
    ) {
      this.localStorageService.setItem(
        EStorageKeys.PARAMETERS_STORAGE_ID,
        JSON.stringify(this._parameters$.getValue())
      );
    }
  }

  getAllParameters$(): Observable<TParameters> {
    return this._parameters$.asObservable();
  }

  setParameters(parameters: TParameters): void {
    this._parameters$.next(parameters);
  }

  resetParameter(parameterKey: keyof TParameters): void {
    this.getAllParameters$()
      .pipe(take(1))
      .subscribe((parameters) => {
        const parameter = parameters[parameterKey];

        if (isBigNumber(parameter.value)) {
          parameter.value = (
            PARAMETERS_START_CONFIG[parameterKey].value as BigNumber
          ).copy();
          return;
        }

        parameter.value = PARAMETERS_START_CONFIG[parameterKey].value;
      });
  }
}
