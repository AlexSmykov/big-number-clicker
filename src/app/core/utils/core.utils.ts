import { TSavedValue } from 'src/app/core/interfaces/core.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { isBigNumber } from 'src/app/core/models/big-number/big-number.guard';

export function parseLoadedValue<T>(value: TSavedValue<T>): T {
  const entries = Object.entries(value);

  if (entries[0][0] === '0') {
    return entries.map(([key, value1]) => {
      return isBigNumber(value1)
        ? new BigNumber(value1.currentValue, value1.depth)
        : typeof value1 !== 'object'
          ? value1
          : parseLoadedValue(value1 as any);
    }) as T;
  }

  return Object.fromEntries(
    entries.map(([key, value1]) => {
      return [
        key,
        isBigNumber(value1)
          ? new BigNumber(value1.currentValue, value1.depth)
          : typeof value1 !== 'object'
            ? value1
            : parseLoadedValue(value1 as any),
      ];
    })
  ) as T;
}

/**
 * Getting chance  and return if chance roll is success
 *
 * @param chance value in range 0-10000
 */
export function rollChance(chance: number): boolean {
  return Math.random() * 10000 <= chance;
}

export function isExhausted(_: never): never {
  throw new Error('Value is not exhausted');
}
