import { TUnlocks } from 'src/app/core/unlocks/unlocks.interface';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';

export const UNLOCKS_START_CONFIG: TUnlocks = {
  [EUnlocks.CRYSTALS]: false,
  [EUnlocks.PRESTIGE]: false,
  [EUnlocks.RUBY]: false,
  [EUnlocks.LOG_MULTIPLIER]: false,
  [EUnlocks.SETTINGS_AND_ABOUT]: false,
  [EUnlocks.MORE_UPGRADES_1]: false,
  [EUnlocks.FLAT_BONUS_1]: false,
};
