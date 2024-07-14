import { TParameters } from 'src/app/core/parameters/parameters.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export const PARAMETERS_START_CONFIG: TParameters = {
  baseRate: new BigNumber(1),
  simpleMultiplier: new BigNumber(1),
  simpleMultiplierCoefficient: new BigNumber(1.5),
  simpleMultiplierCoefficientIncrease: new BigNumber(2.5),
  simplePower: new BigNumber(1),
  simplePowerCoefficient: new BigNumber(0.1),
  simplePowerCoefficientIncrease: new BigNumber(1.5),
  crystalChance: 100,
  crystalChanceIncrease: 10,
  crystalMultiplier: new BigNumber(1),
  crystalMultiplierCoefficient: new BigNumber(2),
  rubyChance: 10,
  logMultiplierBase: 10000,
  clickButtonText: 'Click me!',
};
