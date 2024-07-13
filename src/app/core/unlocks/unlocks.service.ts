import { Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { TUnlocks } from 'src/app/core/unlocks/unlocks.interface';
import { UNLOCKS_CONFIG } from 'src/app/core/unlocks/unlocks.const';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnlocksService {
  private readonly _unlocks$ = new BehaviorSubject<TUnlocks>(UNLOCKS_CONFIG);

  constructor(private localStorageService: LocalStorageService) {
    this.loadUnlocks();
  }

  private loadUnlocks(): void {
    const foundValue = this.localStorageService.getItem(
      EStorageKeys.RESOURCES_STORAGE_ID
    );

    if (foundValue) {
      this._unlocks$.next(JSON.parse(foundValue) as TUnlocks);
    }
  }

  saveResources(): void {
    this.localStorageService.setItem(
      EStorageKeys.RESOURCES_STORAGE_ID,
      JSON.stringify(this._unlocks$.getValue())
    );
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
