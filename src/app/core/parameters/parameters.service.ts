import { Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { PARAMETERS_START_CONFIG } from 'src/app/core/parameters/parameters.const';
import { TParameters } from 'src/app/core/parameters/parameters.interface';
import { TSavedValue } from 'src/app/core/interfaces/core.interface';
import { parseLoadedValue } from 'src/app/core/utils/core.utils';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParametersService {
  private readonly _parameters$ = new BehaviorSubject<TParameters>(
    PARAMETERS_START_CONFIG
  );

  private isHasSavedValue = false;

  constructor(private localStorageService: LocalStorageService) {
    this.loadParameters();
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

  getParameter$(
    parameterKey: keyof TParameters
  ): Observable<TParameters[keyof TParameters]> {
    return this._parameters$.pipe(map((upgrades) => upgrades[parameterKey]));
  }

  getAllParameters$(): Observable<TParameters> {
    return this._parameters$.asObservable();
  }

  setParameters(parameters: TParameters): void {
    this._parameters$.next(parameters);
  }
}
