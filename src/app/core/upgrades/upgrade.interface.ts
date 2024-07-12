import {
  EUpgradeCostGrowth,
  EUpgrades,
  EUpgradeType,
} from 'src/app/core/upgrades/upgrade.enum';
import { BigNumber } from 'src/app/core/models/big-number/big-number';
import { EResources } from 'src/app/core/resources/resources.enum';

export type TUpgrades = Record<EUpgrades, TUpgrade>;

export type TUpgrade = TUpgradeEndless | TUpgradeWithCounts | TUpgradeOneTime;

type TUpgradeBase = {
  name: string;
  description: string;
  type: EUpgradeType;
};

export type TUpgradeEndless = TUpgradeBase & {
  count: number;
  costs: TUpgradeCost[];
  caps: TUpgradeCostGrowthCap[];
};

export type TUpgradeWithCounts = TUpgradeBase & {
  count: number;
  maxCount: number;
  costs: TUpgradeCost[];
  caps: TUpgradeCostGrowthCap[];
};

export type TUpgradeOneTime = TUpgradeBase & {
  bought: boolean;
  costs: TUpgradeConstantCost[];
};

export type TUpgradeConstantCost = {
  startCost: BigNumber;
  resourceType: EResources;
};

export type TUpgradeCost = {
  startCost: BigNumber;
  currentCost: BigNumber;
  resourceType: EResources;
  growth: EUpgradeCostGrowth;
  growthRate: BigNumber;
};

export type TUpgradeCostGrowthCap = {
  startAtCount: number;
  newCostGrowth: { resourceType: EResources; newGrowth: EUpgradeCostGrowth };
};
