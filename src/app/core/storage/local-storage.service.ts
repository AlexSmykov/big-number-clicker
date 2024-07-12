import { Injectable } from '@angular/core';

import { EStorageKeys } from 'src/app/core/storage/local-storage.enum';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private storage: Storage = localStorage;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: EStorageKeys): string | null {
    return this.storage.getItem(key);
  }

  checkItem(key: EStorageKeys): boolean {
    return !!this.storage.getItem(key);
  }

  removeItem(key: EStorageKeys): void {
    this.storage.removeItem(key);
  }

  setItem(key: EStorageKeys, value: string): void {
    this.storage.setItem(key, value);
  }
}
