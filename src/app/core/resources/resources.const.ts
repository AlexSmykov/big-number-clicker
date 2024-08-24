import {
  TResourceData,
  TResources,
} from 'src/app/core/resources/resources.interface';
import { EResources } from 'src/app/core/resources/resources.enum';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export const RESOURCES_START_CONFIG: TResources = {
  [EResources.MONEY]: new BigNumber(50, 1),
  [EResources.CRYSTAL]: new BigNumber(300),
  [EResources.RUBY]: new BigNumber(),
  [EResources.PRESTIGE_POINT]: new BigNumber(300),
};

const ICON_DIR_PATH = 'assets/icons/resources/';

export const RESOURCE_DATA: Record<EResources, TResourceData> = {
  [EResources.MONEY]: {
    name: 'Money',
    description:
      'Your main resource. You can gain it by clicking and spent to upgrades. Prestige points based on money value',
    iconPath: `${ICON_DIR_PATH}coin.svg`,
    iconColor: 'var(--coin-color)',
  },
  [EResources.CRYSTAL]: {
    name: 'Crystals',
    description:
      'Another main resource. Gains from clicking with some chance. Used for better upgrades',
    iconPath: `${ICON_DIR_PATH}crystal.svg`,
    iconColor: 'var(--crystal-color)',
  },
  [EResources.RUBY]: {
    name: 'Rubies',
    description:
      'You can gain it with some chance when getting crystals. Rare resource for powerful ups',
    iconPath: `${ICON_DIR_PATH}crystal.svg`,
    iconColor: 'var(--ruby-color)',
  },
  [EResources.PRESTIGE_POINT]: {
    name: 'Prestige points',
    description:
      "Gains from prestige and don't removes on reset. Upgrade your power through resets with this resources!",
    iconPath: `${ICON_DIR_PATH}p-letter.svg`,
    iconColor: 'var(--prestige-point-color)',
  },
};
