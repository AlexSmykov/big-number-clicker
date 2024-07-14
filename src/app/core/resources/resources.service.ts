import { Injectable } from '@angular/core';

import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { TResources } from 'src/app/core/resources/resources.interface';
import { RESOURCES_CONFIG } from 'src/app/core/resources/resources.const';
import { EResources } from 'src/app/core/resources/resources.enum';
import { LocalStorageService } from 'src/app/core/storage/local-storage.service';
import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';
import { parseLoadedValue } from 'src/app/core/utils/core.utils';
import { TSavedValue } from 'src/app/core/interfaces/core.interface';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private readonly _resource$ = new BehaviorSubject<TResources>(
    RESOURCES_CONFIG
  );

  constructor(private localStorageService: LocalStorageService) {
    this.loadResources();
  }

  private loadResources(): void {
    const foundValue = this.localStorageService.getItem(
      EStorageKeys.RESOURCES_STORAGE_ID
    );

    if (foundValue) {
      this._resource$.next(
        parseLoadedValue(JSON.parse(foundValue) as TSavedValue<TResources>)
      );
    }
  }

  saveResources(): void {
    this.localStorageService.setItem(
      EStorageKeys.RESOURCES_STORAGE_ID,
      JSON.stringify(this._resource$.getValue())
    );
  }

  getResource$(resourceKey: EResources): Observable<BigNumber> {
    return this._resource$.pipe(map((resources) => resources[resourceKey]));
  }

  getAllResources$(): Observable<TResources> {
    return this._resource$.asObservable();
  }

  setResource(value: BigNumber, resourceKey: EResources) {
    const resources = this._resource$.getValue();
    resources[resourceKey] = value;
    this._resource$.next(resources);
  }
}
