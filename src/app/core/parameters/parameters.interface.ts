import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export type TParameters = {
  clickButtonText: string;

  baseMoneyRate: BigNumber;
  baseCrystalRate: BigNumber;
  basePrestigeRate: BigNumber;
  baseRubyRate: BigNumber;

  flatBonus: BigNumber;
  flatBonusUpgrade1: BigNumber;
  flatBonusUpgradePrestige: BigNumber;
  flatBonusStart: BigNumber;
  flatBonusStartCoefficient: BigNumber;

  simpleMultiplier: BigNumber;
  simpleMultiplierIncrease: BigNumber;
  simpleMultiplierCoefficient: BigNumber;
  simpleMultiplierCoefficientIncrease: BigNumber;
  simpleMultiplierPower: BigNumber;
  simpleMultiplierPowerCoefficient: BigNumber;
  simplePower: BigNumber;
  simplePowerCoefficient: BigNumber;
  simplePowerCoefficientIncrease: BigNumber;

  crystalChance: number;
  crystalChanceIncrease: number;
  crystalChanceOnPrestige: number;
  crystalChanceOnPrestigeCoefficient: number;
  crystalChanceMoneyIncrease: number;
  crystalMultiplier: BigNumber;
  crystalMultiplierCoefficient: BigNumber;
  crystalMultiplierCoefficientIncrease: BigNumber;
  crystalGainMultiplier: BigNumber;

  rubyChance: number;
  rubyCristalGainMultiplier: BigNumber;

  logMultiplierBase: number;
  logMultiplierBaseDecrease: number;
  logMultiplierPower: BigNumber;
  logMultiplierPowerIncrease: BigNumber;

  prestigeBorder: BigNumber;
  prestigeBorderDecrease: BigNumber;
  prestigePointsGainCoefficient: BigNumber;
  prestigeMultiplier: BigNumber;
  prestigeMultiplierCoefficient: BigNumber;
};
