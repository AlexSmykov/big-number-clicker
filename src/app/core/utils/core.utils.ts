import { TSavedValue } from 'src/app/core/interfaces/core.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { isBigNumber } from 'src/app/core/models/big-number/big-number.guard';

export function parseLoadedValue<T>(value: TSavedValue<T>): T {
  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => {
      return [
        key,
        isBigNumber(value)
          ? new BigNumber(value.currentValue, value.depth)
          : value,
      ];
    })
  ) as T;
}
