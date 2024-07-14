import { Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { TUnlocks } from 'src/app/core/unlocks/unlocks.interface';
import { UNLOCKS_START_CONFIG } from 'src/app/core/unlocks/unlocks.const';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';
import { parseLoadedValue } from 'src/app/core/utils/core.utils';
import { TSavedValue } from 'src/app/core/interfaces/core.interface';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnlocksService {
  private readonly _unlocks$ = new BehaviorSubject<TUnlocks>(
    UNLOCKS_START_CONFIG
  );

  private isHasSavedValue = false;

  constructor(private localStorageService: LocalStorageService) {
    this.loadUnlocks();
  }

  private loadUnlocks(): void {
    const foundValue = this.localStorageService.getItem(
      EStorageKeys.UNLOCKS_STORAGE_ID
    );

    if (
      foundValue &&
      Object.keys(JSON.parse(foundValue)).length ===
        Object.keys(UNLOCKS_START_CONFIG).length
    ) {
      this.isHasSavedValue = true;
      this._unlocks$.next(
        parseLoadedValue(JSON.parse(foundValue) as TSavedValue<TUnlocks>)
      );
    }
  }

  saveUnlocks(): void {
    if (
      this.isHasSavedValue ===
      this.localStorageService.checkItem(EStorageKeys.UNLOCKS_STORAGE_ID)
    ) {
      this.localStorageService.setItem(
        EStorageKeys.UNLOCKS_STORAGE_ID,
        JSON.stringify(this._unlocks$.getValue())
      );
    }
  }

  getIsUnlock$(unlockKey: EUnlocks): Observable<boolean> {
    return this._unlocks$.pipe(map((unlocks) => unlocks[unlockKey]));
  }

  setLock(value: boolean, unlockKey: EUnlocks) {
    const unlocks = this._unlocks$.getValue();
    unlocks[unlockKey] = value;
    this._unlocks$.next(unlocks);
  }
}
