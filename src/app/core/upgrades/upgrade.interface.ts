import {
  EUpgradeBuyType,
  EUpgradeCostGrowth,
  EUpgrades,
  EUpgradeTier,
  EUpgradeType,
} from 'src/app/core/upgrades/upgrade.enum';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';
import { EResources } from 'src/app/core/resources/resources.enum';
import { TParameters } from 'src/app/core/parameters/parameters.interface';

export type TUpgrades = Record<EUpgrades, TUpgrade>;

export type TUpgrade = TUpgradeEndless | TUpgradeWithCounts | TUpgradeOneTime;

type TUpgradeBase = {
  name: string;
  tier: EUpgradeTier;
  description: string;
  type: EUpgradeType;
  buyType: EUpgradeBuyType;
  createTooltip: (parameters: TParameters) => string | undefined;
};

export type TUpgradeEndless = Omit<TUpgradeBase, 'buyType'> & {
  count: number;
  currentCap: number;
  caps: TUpgradeCostCap[];
  buyType: EUpgradeBuyType.ENDLESS;
};

export type TUpgradeWithCounts = Omit<TUpgradeBase, 'buyType'> & {
  count: number;
  maxCount: number;
  currentCap: number;
  caps: TUpgradeCostCap[];
  buyType: EUpgradeBuyType.WITH_COUNT;
};

export type TUpgradeOneTime = Omit<TUpgradeBase, 'buyType'> & {
  bought: boolean;
  costs: TUpgradeConstantCost[];
  buyType: EUpgradeBuyType.ONE_TIME;
};

export type TUpgradeConstantCost = {
  cost: BigNumber;
  resourceType: EResources;
};

export type TUpgradeCost = {
  startCost: BigNumber;
  cost: BigNumber;
  resourceType: EResources;
  growthFormula: EUpgradeCostGrowth;
  growthRate: BigNumber;
};

export type TUpgradeCostCap = {
  startAtCount: number;
  costs: TUpgradeCost[];
};
