import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export type TSavedValue<T> = {
  [key in keyof T]?: T[key] extends BigNumber
    ? { currentNumber: number; depth: number }
    : T[key];
};
