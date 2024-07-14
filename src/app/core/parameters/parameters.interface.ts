import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export type TParameters = {
  baseRate: BigNumber;
  simpleMultiplier: BigNumber;
  simpleMultiplierCoefficient: BigNumber;
  simpleMultiplierCoefficientIncrease: BigNumber;
  simplePower: BigNumber;
  simplePowerCoefficient: BigNumber;
  simplePowerCoefficientIncrease: BigNumber;
  crystalChance: number;
  crystalChanceIncrease: number;
  crystalMultiplier: BigNumber;
  crystalMultiplierCoefficient: BigNumber;
  rubyChance: number;
  logMultiplierBase: number;
  clickButtonText: string;
};
