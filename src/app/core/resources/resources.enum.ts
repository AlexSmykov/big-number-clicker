import { TResourceData } from 'src/app/core/resources/resources.interface';

export enum EResources {
  MONEY = 'MONEY',
  CRYSTAL = 'CRYSTAL',
  RUBY = 'RUBY',
  PRESTIGE_POINT = 'PRESTIGE_POINT',
}

const iconDirPath = 'assets/icons/resources/';
export const EResourcesData: Record<EResources, TResourceData> = {
  [EResources.MONEY]: {
    name: 'Money',
    description:
      'Your main resource. You can gain it by clicking and spent to upgrades. Prestige points based on money value',
    iconPath: `${iconDirPath}coin.svg`,
    iconColor: '--coin-color',
  },
  [EResources.CRYSTAL]: {
    name: 'Crystals',
    description:
      'Another main resource. Gains from clicking with some chance. Used for better upgrades',
    iconPath: `${iconDirPath}crystal.svg`,
    iconColor: '--crystal-color',
  },
  [EResources.RUBY]: {
    name: 'Rubys',
    description:
      'You can gain it with some chance when getting crystals. Rare resource for powerful ups',
    iconPath: `${iconDirPath}crystal.svg`,
    iconColor: '--ruby-color',
  },
  [EResources.PRESTIGE_POINT]: {
    name: 'Prestige points',
    description:
      "Gains from prestige and don't removes on reset. Upgrade your power through resets with this resources!",
    iconPath: `${iconDirPath}p-letter.svg`,
    iconColor: '--prestige-point-color',
  },
};
