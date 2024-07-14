import {
  EUpgradeCostGrowth,
  EUpgrades,
} from 'src/app/core/upgrades/upgrade.enum';
import {
  TUpgrade,
  TUpgradeCost,
} from 'src/app/core/upgrades/upgrade.interface';

export const UPGRADE_COST_GROW_FORMULAS: Record<
  EUpgradeCostGrowth,
  (cost: TUpgradeCost, count: number) => void
> = {
  [EUpgradeCostGrowth.NONE]: (cost: TUpgradeCost, count: number) => {},
  [EUpgradeCostGrowth.PLUS]: (cost: TUpgradeCost, count: number) => {
    cost.currentCost.plus(cost.growthRate);
  },
  [EUpgradeCostGrowth.PLUS_BY_COUNT]: (cost: TUpgradeCost, count: number) => {
    const rateCopy = cost.growthRate.copy();
    rateCopy.multiply(count);
    cost.currentCost.plus(rateCopy);
  },
  [EUpgradeCostGrowth.MULTIPLY]: (cost: TUpgradeCost, count: number) => {
    cost.currentCost.multiply(cost.growthRate);
  },
  [EUpgradeCostGrowth.MULTIPLY_BY_COUNT]: (
    cost: TUpgradeCost,
    count: number
  ) => {
    const rateCopy = cost.growthRate.copy();
    rateCopy.pow(count);
    cost.currentCost.multiply(rateCopy);
  },
  [EUpgradeCostGrowth.POWER]: (cost: TUpgradeCost, count: number) => {
    cost.currentCost.pow(cost.growthRate);
  },
};

export const UPGRADES_START_CONFIG: Record<EUpgrades, TUpgrade> = {};
