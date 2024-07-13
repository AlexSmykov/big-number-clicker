import { Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { TUpgrade, TUpgrades } from 'src/app/core/upgrades/upgrade.interface';
import { UPGRADES_CONFIG } from 'src/app/core/upgrades/upgrade.const';
import { EUpgrades } from 'src/app/core/upgrades/upgrade.enum';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpgradeService {
  private readonly _upgrades$ = new BehaviorSubject<TUpgrades>(UPGRADES_CONFIG);

  constructor(private localStorageService: LocalStorageService) {
    this.loadUpgrades();
  }

  private loadUpgrades(): void {
    const foundValue = this.localStorageService.getItem(
      EStorageKeys.RESOURCES_STORAGE_ID
    );

    if (foundValue) {
      this._upgrades$.next(JSON.parse(foundValue) as TUpgrades);
    }
  }

  saveUpgrades(): void {
    this.localStorageService.setItem(
      EStorageKeys.UPGRADES_STORAGE_ID,
      JSON.stringify(this._upgrades$.getValue())
    );
  }

  getUpgrades$(upgradeKey: EUpgrades): Observable<TUpgrade> {
    return this._upgrades$.pipe(map((upgrades) => upgrades[upgradeKey]));
  }

  upgrade(upgradeKey: EUpgrades) {
    const upgrades = this._upgrades$.getValue();
    switch (upgradeKey) {
      default:
        return;
    }
  }
}
