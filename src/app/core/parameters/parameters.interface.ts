import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export type TParameters = {
  clickButtonText: TParametersValue<string>;

  baseMoneyRate: TParametersValue<BigNumber>;
  baseCrystalRate: TParametersValue<BigNumber>;
  baseCrystalChanceRate: TParametersValue<number>;
  basePrestigeRate: TParametersValue<BigNumber>;
  baseRubyRate: TParametersValue<BigNumber>;
  baseRubyChanceRate: TParametersValue<number>;

  flatBonus: TParametersValue<BigNumber>;
  flatBonusUpgrade1: TParametersValue<BigNumber>;
  flatBonusUpgradePrestige: TParametersValue<BigNumber>;
  flatBonusStart: TParametersValue<BigNumber>;
  flatBonusStartCoefficient: TParametersValue<BigNumber>;

  simpleMultiplier: TParametersValue<BigNumber>;
  simpleMultiplierIncrease: TParametersValue<BigNumber>;
  simpleMultiplierCoefficient: TParametersValue<BigNumber>;
  simpleMultiplierCoefficientIncrease: TParametersValue<BigNumber>;
  simpleMultiplierBuyBonus: TParametersValue<BigNumber>;
  simpleMultiplierPower: TParametersValue<BigNumber>;
  simpleMultiplierPowerCoefficient: TParametersValue<BigNumber>;

  permanentSimpleMultiplier: TParametersValue<BigNumber>;
  permanentSimpleMultiplierCoefficient: TParametersValue<BigNumber>;

  crystalChance: TParametersValue<number>;
  crystalChanceIncrease: TParametersValue<number>;
  crystalChanceOnPrestige: TParametersValue<number>;
  crystalChanceOnPrestigeCoefficient: TParametersValue<number>;
  crystalChanceOnPrestigeCoefficientIncrease: TParametersValue<number>;
  crystalChanceMoneyIncrease: TParametersValue<number>;
  crystalChanceByPrestige: TParametersValue<number>;
  crystalChanceByPrestigeCoefficient: TParametersValue<number>;
  crystalMultiplier: TParametersValue<BigNumber>;
  crystalMultiplierCoefficient: TParametersValue<BigNumber>;
  crystalMultiplierCoefficientIncrease: TParametersValue<BigNumber>;
  crystalGainMultiplier: TParametersValue<BigNumber>;

  rubyChance: TParametersValue<number>;
  rubyChanceCoefficient: TParametersValue<number>;
  rubyCristalGainMultiplier: TParametersValue<BigNumber>;

  logMultiplierBase: TParametersValue<number>;
  logMultiplierBaseDecrease: TParametersValue<number>;
  logMultiplierPower: TParametersValue<BigNumber>;
  logMultiplierPowerIncrease: TParametersValue<BigNumber>;

  prestigeBorder: TParametersValue<BigNumber>;
  prestigeBorderGrowth: TParametersValue<BigNumber>;
  prestigeBorderGrowthCoefficient: TParametersValue<BigNumber>;
  prestigeBorderDecrease: TParametersValue<BigNumber>;
  prestigeBorderDecreaseCoefficient: TParametersValue<BigNumber>;
  prestigePointsGainPower: TParametersValue<BigNumber>;
  prestigePointsGainPowerCoefficient: TParametersValue<BigNumber>;
  prestigeMultiplier: TParametersValue<BigNumber>;
  prestigeMultiplierCoefficient: TParametersValue<BigNumber>;

  oneTimeMultiplier: TParametersValue<BigNumber>;
  oneTimeMultiplierBonus1: TParametersValue<BigNumber>;
};

export type TParametersValue<T> = {
  name: string;
  isVisible: boolean;
  value: T;
  isPercent: boolean;
  isResetOnPrestige: boolean;
};
