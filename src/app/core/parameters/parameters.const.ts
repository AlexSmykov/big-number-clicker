import { TParameters } from 'src/app/core/parameters/parameters.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export const PARAMETERS_START_CONFIG: TParameters = {
  clickButtonText: {
    name: '',
    isVisible: false,
    value: 'Click me!',
    isPercent: false,
  },

  baseMoneyRate: {
    name: '',
    isVisible: false,
    value: new BigNumber(100),
    isPercent: false,
  },
  baseCrystalRate: {
    name: '',
    isVisible: false,
    value: new BigNumber(100),
    isPercent: false,
  },
  basePrestigeRate: {
    name: '',
    isVisible: false,
    value: new BigNumber(1),
    isPercent: false,
  },
  baseRubyRate: {
    name: '',
    isVisible: false,
    value: new BigNumber(1),
    isPercent: false,
  },

  flatBonus: {
    name: 'Flat bonus',
    isVisible: true,
    value: new BigNumber(0),
    isPercent: false,
  },
  flatBonusUpgrade1: {
    name: '',
    isVisible: false,
    value: new BigNumber(1000),
    isPercent: false,
  },
  flatBonusUpgradePrestige: {
    name: '',
    isVisible: false,
    value: new BigNumber(10),
    isPercent: false,
  },
  flatBonusStart: {
    name: 'Start flat bonus',
    isVisible: true,
    value: new BigNumber(0),
    isPercent: false,
  },
  flatBonusStartCoefficient: {
    name: '',
    isVisible: false,
    value: new BigNumber(10),
    isPercent: false,
  },

  simpleMultiplier: {
    name: 'Simple multiplier',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  simpleMultiplierIncrease: {
    name: '',
    isVisible: false,
    value: new BigNumber(2),
    isPercent: false,
  },
  simpleMultiplierCoefficient: {
    name: 'Simple multiplier coefficient',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  simpleMultiplierCoefficientIncrease: {
    name: '',
    isVisible: false,
    value: new BigNumber(3),
    isPercent: false,
  },
  simpleMultiplierPower: {
    name: 'Simple multiplier power',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  simpleMultiplierPowerCoefficient: {
    name: '',
    isVisible: false,
    value: new BigNumber(0.1),
    isPercent: false,
  },

  crystalChance: {
    name: 'Crystal chance',
    isVisible: true,
    value: 100,
    isPercent: true,
  },
  crystalChanceIncrease: {
    name: '',
    isVisible: false,
    value: 10,
    isPercent: true,
  },
  crystalChanceMoneyIncrease: {
    name: '',
    isVisible: false,
    value: 10,
    isPercent: true,
  },
  crystalChanceOnPrestige: {
    name: 'Crystal chance from prestige',
    isVisible: true,
    value: 0,
    isPercent: true,
  },
  crystalChanceOnPrestigeCoefficient: {
    name: '',
    isVisible: false,
    value: 10,
    isPercent: true,
  },
  crystalMultiplier: {
    name: 'Crystal multiplier',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  crystalMultiplierCoefficient: {
    name: 'Crystal multiplier coefficient',
    isVisible: true,
    value: new BigNumber(2),
    isPercent: false,
  },
  crystalMultiplierCoefficientIncrease: {
    name: '',
    isVisible: false,
    value: new BigNumber(0.1),
    isPercent: false,
  },
  crystalGainMultiplier: {
    name: 'Crystal gain multiplier',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },

  rubyChance: {
    name: 'Ruby chance',
    isVisible: true,
    value: 10,
    isPercent: true,
  },
  rubyCristalGainMultiplier: {
    name: '',
    isVisible: false,
    value: new BigNumber(2),
    isPercent: false,
  },

  logMultiplierBase: {
    name: 'Logarithm multiplier base',
    isVisible: true,
    value: 1000,
    isPercent: false,
  },
  logMultiplierBaseDecrease: {
    name: '',
    isVisible: false,
    value: 1.5,
    isPercent: false,
  },
  logMultiplierPower: {
    name: 'Logarithm multiplier power',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  logMultiplierPowerIncrease: {
    name: '',
    isVisible: false,
    value: new BigNumber(0.1),
    isPercent: false,
  },

  prestigeBorder: {
    name: 'Current prestige border',
    isVisible: true,
    value: new BigNumber(10000000),
    isPercent: false,
  },
  prestigeBorderDecrease: {
    name: '',
    isVisible: false,
    value: new BigNumber(0.9),
    isPercent: false,
  },
  prestigePointsGainCoefficient: {
    name: 'Prestige point gain coefficient',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  prestigeMultiplier: {
    name: 'Prestige multiplier',
    isVisible: true,
    value: new BigNumber(1),
    isPercent: false,
  },
  prestigeMultiplierCoefficient: {
    name: '',
    isVisible: false,
    value: new BigNumber(1),
    isPercent: false,
  },
};
