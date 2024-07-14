import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export function isBigNumber(value: any): value is BigNumber {
  return value['currentValue'] !== undefined && value['depth'] !== null;
}
