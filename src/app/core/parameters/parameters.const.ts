import { TParameters } from 'src/app/core/parameters/parameters.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export const PARAMETERS_START_CONFIG: TParameters = {
  clickButtonText: 'Click me!',

  baseMoneyRate: new BigNumber(100),
  baseCrystalRate: new BigNumber(100),
  basePrestigeRate: new BigNumber(1),
  baseRubyRate: new BigNumber(1),

  flatBonus: new BigNumber(0),
  flatBonusUpgrade1: new BigNumber(1000),
  flatBonusUpgradePrestige: new BigNumber(10),
  flatBonusStart: new BigNumber(0),
  flatBonusStartCoefficient: new BigNumber(10),

  simpleMultiplier: new BigNumber(1),
  simpleMultiplierIncrease: new BigNumber(2),
  simpleMultiplierCoefficient: new BigNumber(1),
  simpleMultiplierCoefficientIncrease: new BigNumber(3),
  simpleMultiplierPower: new BigNumber(1),
  simpleMultiplierPowerCoefficient: new BigNumber(0.1),

  crystalChance: 100,
  crystalChanceIncrease: 10,
  crystalChanceMoneyIncrease: 10,
  crystalChanceOnPrestige: 0,
  crystalChanceOnPrestigeCoefficient: 10,
  crystalMultiplier: new BigNumber(1),
  crystalMultiplierCoefficient: new BigNumber(2),
  crystalMultiplierCoefficientIncrease: new BigNumber(0.1),
  crystalGainMultiplier: new BigNumber(1),

  rubyChance: 10,
  rubyCristalGainMultiplier: new BigNumber(2),

  logMultiplierBase: 1000,
  logMultiplierBaseDecrease: 1.5,
  logMultiplierPower: new BigNumber(1),
  logMultiplierPowerIncrease: new BigNumber(0.1),

  prestigeBorder: new BigNumber(10000000),
  prestigeBorderDecrease: new BigNumber(0.9),
  prestigePointsGainCoefficient: new BigNumber(1),
  prestigeMultiplier: new BigNumber(1),
  prestigeMultiplierCoefficient: new BigNumber(1),
};
