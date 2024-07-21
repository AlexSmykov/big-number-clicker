import {
  TUpgrade,
  TUpgradeEndless,
  TUpgradeOneTime,
  TUpgradeWithCounts,
} from 'src/app/core/upgrades/upgrade.interface';
import { EUpgradeBuyType } from 'src/app/core/upgrades/upgrade.enum';

export function isEndlessUpgrade(
  upgrade: TUpgrade
): upgrade is TUpgradeEndless {
  return upgrade.buyType === EUpgradeBuyType.ENDLESS;
}

export function isCountableUpgrade(
  upgrade: TUpgrade
): upgrade is TUpgradeWithCounts {
  return upgrade.buyType === EUpgradeBuyType.WITH_COUNT;
}

export function isOneTimeUpgrade(
  upgrade: TUpgrade
): upgrade is TUpgradeOneTime {
  return upgrade.buyType === EUpgradeBuyType.ONE_TIME;
}
