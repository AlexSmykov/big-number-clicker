import {
  EUpgradeBuyType,
  EUpgradeCostGrowth,
  EUpgrades,
  EUpgradeTier,
  EUpgradeType,
} from 'src/app/core/upgrades/upgrade.enum';
import {
  TUpgrade,
  TUpgradeCost,
} from 'src/app/core/upgrades/upgrade.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { EResources } from 'src/app/core/resources/resources.enum';
import { TParameters } from 'src/app/core/parameters/parameters.interface';

export const UPGRADE_COST_GROW_FORMULAS: Record<
  EUpgradeCostGrowth,
  (cost: TUpgradeCost, count: number) => void
> = {
  [EUpgradeCostGrowth.NONE]: (_: TUpgradeCost, __: number) => {},
  [EUpgradeCostGrowth.PLUS]: (cost: TUpgradeCost, _: number) => {
    cost.cost.plus(cost.growthRate);
  },
  [EUpgradeCostGrowth.PLUS_BY_COUNT]: (cost: TUpgradeCost, count: number) => {
    const rateCopy = cost.growthRate.copy();
    rateCopy.multiply(count);
    cost.cost.plus(rateCopy);
  },
  [EUpgradeCostGrowth.MULTIPLY]: (cost: TUpgradeCost, _: number) => {
    cost.cost.multiply(cost.growthRate);
  },
  [EUpgradeCostGrowth.MULTIPLY_BY_COUNT]: (
    cost: TUpgradeCost,
    count: number
  ) => {
    const rateCopy = cost.growthRate.copy();
    rateCopy.pow(count);
    cost.cost.multiply(rateCopy);
  },
  [EUpgradeCostGrowth.POWER]: (cost: TUpgradeCost, _: number) => {
    cost.cost.pow(cost.growthRate);
  },
};

export const TIER_COLORS: Record<EUpgradeTier, string> = {
  [EUpgradeTier.COMMON]: 'var(--upgrade-common-color)',
  [EUpgradeTier.UNCOMMON]: 'var(--upgrade-uncommon-color)',
  [EUpgradeTier.UNIQUE]: 'var(--upgrade-unique-color)',
  [EUpgradeTier.RARE]: 'var(--upgrade-rare-color)',
  [EUpgradeTier.EPIC]: 'var(--upgrade-epic-color)',
  [EUpgradeTier.LEGENDARY]: 'var(--upgrade-legendary-color)',
  [EUpgradeTier.MYTHIC]: 'var(--upgrade-mythic-color)',
};

export const EUpgradeTierNames: Record<EUpgradeTier, string> = {
  [EUpgradeTier.COMMON]: 'Common',
  [EUpgradeTier.UNCOMMON]: 'Uncommon',
  [EUpgradeTier.UNIQUE]: 'Unique',
  [EUpgradeTier.RARE]: 'Rare',
  [EUpgradeTier.EPIC]: 'Epic',
  [EUpgradeTier.LEGENDARY]: 'Legendary',
  [EUpgradeTier.MYTHIC]: 'Mythic',
};

export const UPGRADES_START_CONFIG: Record<EUpgrades, TUpgrade> = {
  // Endless upgrades
  [EUpgrades.SIMPLE_MULTIPLIER]: {
    name: 'Simple multiplier',
    description:
      'Your first upgrade to make money easy. Just adds number to your multiplier.',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.MONEY,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: true,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(25),
            cost: new BigNumber(25),
            resourceType: EResources.MONEY,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(2),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Simple multiplier: ${parameters.simpleMultiplier} -> ${parameters.simpleMultiplier.copy().plus(parameters.simpleMultiplierCoefficient)}`;
    },
  },
  [EUpgrades.SIMPLE_MULTIPLIER_BOOST]: {
    name: 'Simple multiplier boost',
    description: 'Boost your simple multiplier upgrade, by multiply his power.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.MONEY,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: true,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(10000),
            cost: new BigNumber(10000),
            resourceType: EResources.MONEY,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(10),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Simple multiplier: ${parameters.simpleMultiplier} -> ${parameters.simpleMultiplier.copy().multiply(parameters.simpleMultiplierIncrease)}; Simple multiplier increase coefficient: ${parameters.simpleMultiplierCoefficient} -> ${parameters.simpleMultiplierCoefficient.copy().multiply(parameters.simpleMultiplierCoefficientIncrease.copy())}`;
    },
  },
  [EUpgrades.LOG_MULTIPLIER_BASE]: {
    name: 'Base of logarithmic multiplier',
    description: 'Decrease base of logarithm (increase result value).',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(5),
            cost: new BigNumber(5),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(5),
          },
        ],
      },
      {
        startAtCount: 9,
        costs: [
          {
            startCost: new BigNumber(50),
            cost: new BigNumber(50),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(25),
          },
          {
            startCost: new BigNumber(1),
            cost: new BigNumber(1),
            resourceType: EResources.RUBY,
            growthFormula: EUpgradeCostGrowth.NONE,
            growthRate: new BigNumber(0),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Logarithmic multiplier: log(${parameters.logMultiplierBase.toPrecision(4)}, money)^${parameters.logMultiplierPower}
       -> log(${((parameters.logMultiplierBase - 1) / parameters.logMultiplierBaseDecrease + 1).toPrecision(4)}, money)^${parameters.logMultiplierPower}`;
    },
  },
  [EUpgrades.CRYSTAL_CHANCE]: {
    name: 'Increase chance of crystals',
    description: 'You getting crystals too rarely? This upgrade is for you.',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(1),
            cost: new BigNumber(1),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(1),
          },
        ],
      },
      {
        startAtCount: 89,
        costs: [
          {
            startCost: new BigNumber(100),
            cost: new BigNumber(100),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(2),
          },
        ],
      },
      {
        startAtCount: 189,
        costs: [
          {
            startCost: new BigNumber(300),
            cost: new BigNumber(300),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(4),
          },
        ],
      },
      {
        startAtCount: 289,
        costs: [
          {
            startCost: new BigNumber(700),
            cost: new BigNumber(700),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(8),
          },
        ],
      },
      {
        startAtCount: 389,
        costs: [
          {
            startCost: new BigNumber(1500),
            cost: new BigNumber(1500),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(16),
          },
        ],
      },
      {
        startAtCount: 489,
        costs: [
          {
            startCost: new BigNumber(3100),
            cost: new BigNumber(3100),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(100),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Crystal chance: ${parameters.crystalChance / 100}% -> ${(parameters.crystalChance + parameters.crystalChanceIncrease) / 100}%`;
    },
  },
  [EUpgrades.CRYSTAL_MULTIPLIER]: {
    name: 'Crystal multiplier',
    description: 'More powerful multiplier, but with fair cost.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(1),
            cost: new BigNumber(1),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(1),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Crystal multiplier: ${parameters.crystalMultiplier} -> ${parameters.crystalMultiplier.copy().multiply(parameters.crystalMultiplierCoefficient)}`;
    },
  },
  [EUpgrades.SIMPLE_MULTIPLIER_POWER]: {
    name: 'Simple multiplier power',
    description:
      "Power to your simple multiplier. Don't work if multiplier is 1.",
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(2),
            cost: new BigNumber(2),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(2),
          },
          {
            startCost: new BigNumber(4),
            cost: new BigNumber(4),
            resourceType: EResources.PRESTIGE_POINT,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(2),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Simple multiplier power: ${parameters.simpleMultiplierPower} -> ${parameters.simpleMultiplierPower.copy().plus(parameters.simpleMultiplierPowerCoefficient)}`;
    },
  },
  [EUpgrades.PRESTIGE_MULTIPLIER]: {
    name: 'Prestige multiplier',
    description: 'Permanent multiplier to income.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: false,
    isResetOnPrestige: false,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(5),
            cost: new BigNumber(5),
            resourceType: EResources.PRESTIGE_POINT,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(2),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Prestige multiplier: ${parameters.prestigeMultiplier} -> ${parameters.prestigeMultiplier.copy().plus(parameters.prestigeMultiplierCoefficient)}`;
    },
  },
  [EUpgrades.CRYSTAL_MULTIPLIER_COEFFICIENT]: {
    name: 'Crystal multiplier coefficient',
    description: 'Increase multiply coefficient to Crystal multiplier.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.ENDLESS,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(10),
            cost: new BigNumber(10),
            resourceType: EResources.PRESTIGE_POINT,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(2.5),
          },
          {
            startCost: new BigNumber(1),
            cost: new BigNumber(1),
            resourceType: EResources.RUBY,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(1),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Crystal multiplier coefficient: ${parameters.crystalMultiplierCoefficient} -> ${parameters.crystalMultiplierCoefficient.copy().plus(parameters.crystalMultiplierCoefficientIncrease)}`;
    },
  },

  // Countable upgrades
  [EUpgrades.LOG_MULTIPLIER_POWER]: {
    name: 'Power of logarithmic multiplier',
    description: 'Adds power to log result value.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.WITH_COUNT,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    maxCount: 50,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(10),
            cost: new BigNumber(10),
            resourceType: EResources.CRYSTAL,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(2),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Logarithmic multiplier: log(${parameters.logMultiplierBase.toPrecision(4)}, money)^${parameters.logMultiplierPower} -> log(${parameters.logMultiplierBase.toPrecision(4)}, money)^${parameters.logMultiplierPower.copy().plus(parameters.logMultiplierPowerIncrease)}`;
    },
  },
  [EUpgrades.CRYSTAL_CHANCE_BY_MONEY]: {
    name: 'Increase crystal chance',
    description:
      'Spent money to gain crystals. Alternative version of crystal upgrade.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.WITH_COUNT,
    isUnlocked: false,
    isResetOnPrestige: true,
    count: 0,
    currentCap: 0,
    maxCount: 100,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(50000),
            cost: new BigNumber(50000),
            resourceType: EResources.MONEY,
            growthFormula: EUpgradeCostGrowth.MULTIPLY,
            growthRate: new BigNumber(5),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Crystal chance: ${parameters.crystalChance / 100}% -> ${(parameters.crystalChance + parameters.crystalChanceMoneyIncrease) / 100}%`;
    },
  },
  [EUpgrades.START_FLAT_BONUS]: {
    name: 'Start flat bonus',
    description: 'Add some start bonus to income for headstart.',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.WITH_COUNT,
    isUnlocked: false,
    isResetOnPrestige: false,
    count: 0,
    currentCap: 0,
    maxCount: 10,
    caps: [
      {
        startAtCount: 0,
        costs: [
          {
            startCost: new BigNumber(5),
            cost: new BigNumber(5),
            resourceType: EResources.PRESTIGE_POINT,
            growthFormula: EUpgradeCostGrowth.PLUS,
            growthRate: new BigNumber(5),
          },
        ],
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Start flat bonus: ${parameters.flatBonusStart} -> ${parameters.flatBonusStart.copy().plus(parameters.flatBonusStartCoefficient)}`;
    },
  },

  // One time unlocks
  [EUpgrades.UNLOCK_CRYSTALS]: {
    bought: false,
    name: 'Unlock Crystals',
    description: 'Unlock new resource, upgrades to gain money faster.',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.MONEY,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: true,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(1500),
        resourceType: EResources.MONEY,
      },
    ],
    createTooltip(_: TParameters): string | undefined {
      return undefined;
    },
  },
  [EUpgrades.UNLOCK_SETTINGS_AND_ABOUT]: {
    bought: false,
    name: 'Unlock Settings and About',
    description: 'Unlocks two useful pages for you.',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(5000),
        resourceType: EResources.MONEY,
      },
      {
        cost: new BigNumber(4),
        resourceType: EResources.CRYSTAL,
      },
    ],
    createTooltip(_: TParameters): string | undefined {
      return undefined;
    },
  },
  [EUpgrades.UNLOCK_PRESTIGE]: {
    bought: false,
    name: 'Unlock Prestige',
    description:
      'New way to increase income by sacrifice current progress. Unlocks new resource and upgrades.',
    tier: EUpgradeTier.UNIQUE,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(100000000),
        resourceType: EResources.MONEY,
      },
      {
        cost: new BigNumber(15),
        resourceType: EResources.CRYSTAL,
      },
    ],
    createTooltip(_: TParameters): string | undefined {
      return undefined;
    },
  },
  [EUpgrades.UNLOCK_LOG_MULTIPLIER]: {
    bought: false,
    name: 'Unlock Logarithmic Multiplier',
    description:
      'This multiplier based on your current money: more have - more will gain!',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(50000),
        resourceType: EResources.MONEY,
      },
      {
        cost: new BigNumber(6),
        resourceType: EResources.CRYSTAL,
      },
    ],
    createTooltip(_: TParameters): string | undefined {
      return undefined;
    },
  },
  [EUpgrades.UNLOCK_RUBIES]: {
    bought: false,
    name: 'Unlock Logarithmic Multiplier',
    description:
      'This multiplier based on your current money: more have - more will gain!',
    tier: EUpgradeTier.UNIQUE,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(50000000),
        resourceType: EResources.MONEY,
      },
      {
        cost: new BigNumber(10),
        resourceType: EResources.CRYSTAL,
      },
      {
        cost: new BigNumber(25),
        resourceType: EResources.PRESTIGE_POINT,
      },
    ],
    createTooltip(_: TParameters): string | undefined {
      return undefined;
    },
  },
  [EUpgrades.UNLOCK_MORE_UPGRADES_1]: {
    bought: false,
    name: 'Unlock more upgrades 1',
    description: 'Added first pack of useful upgrades just for you <3',
    tier: EUpgradeTier.UNIQUE,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(10, 1),
        resourceType: EResources.MONEY,
      },
      {
        cost: new BigNumber(20),
        resourceType: EResources.CRYSTAL,
      },
      {
        cost: new BigNumber(50),
        resourceType: EResources.PRESTIGE_POINT,
      },
    ],
    createTooltip: (_: TParameters): string | undefined => {
      return undefined;
    },
  },
  [EUpgrades.FLAT_BONUS]: {
    bought: false,
    name: 'Flat bonus',
    description: 'Adds some flat bonus to your income',
    tier: EUpgradeTier.COMMON,
    type: EUpgradeType.CRYSTAL,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(100000),
        resourceType: EResources.MONEY,
      },
      {
        cost: new BigNumber(2),
        resourceType: EResources.CRYSTAL,
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Flat bonus: ${parameters.flatBonus} -> ${parameters.flatBonus.copy().plus(parameters.flatBonusUpgrade1)}`;
    },
  },
  [EUpgrades.CRYSTAL_CHANCE_ON_PRESTIGE]: {
    bought: false,
    name: 'Crystal chance on prestige',
    description: 'While prestige, your base crystal chance increase.',
    tier: EUpgradeTier.UNCOMMON,
    type: EUpgradeType.PRESTIGE,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(50),
        resourceType: EResources.PRESTIGE_POINT,
      },
      {
        cost: new BigNumber(10),
        resourceType: EResources.CRYSTAL,
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Crystal chance every prestige: +${parameters.crystalChanceOnPrestigeCoefficient / 100}%`;
    },
  },
  [EUpgrades.MULTIPLY_CRYSTAL_GAIN]: {
    bought: false,
    name: 'Multiply crystal gain',
    description: 'If crystal is rolling, you will gain more crystals.',
    tier: EUpgradeTier.UNIQUE,
    type: EUpgradeType.RUBY,
    buyType: EUpgradeBuyType.ONE_TIME,
    isUnlocked: false,
    isResetOnPrestige: false,
    costs: [
      {
        cost: new BigNumber(5),
        resourceType: EResources.RUBY,
      },
    ],
    createTooltip: (parameters: TParameters): string | undefined => {
      return `Crystal gain per chance: ${parameters.crystalGainMultiplier} -> ${parameters.crystalGainMultiplier.copy().multiply(parameters.rubyCristalGainMultiplier)}`;
    },
  },
};
