import { TSidebarButton } from 'src/app/components/sidebar/sidebar.interface';
import { ERoutes } from 'src/app/core/router-paths';
import { EPages } from 'src/app/components/sidebar/sidebar.enum';

export const SIDEBAR_BUTTONS: Record<EPages, TSidebarButton> = {
  [EPages.MAIN]: {
    iconPath: 'assets/icons/tabs/main.svg',
    title: 'Main',
    routePath: ERoutes.MAIN,
  },
  [EPages.UPGRADES]: {
    iconPath: 'assets/icons/tabs/upgrades.svg',
    title: 'Upgrades',
    routePath: ERoutes.UPGRADES,
  },
  [EPages.PRESTIGE]: {
    iconPath: 'assets/icons/tabs/prestige.svg',
    title: 'Prestige',
    routePath: ERoutes.PRESTIGE,
  },
  [EPages.SETTINGS]: {
    iconPath: 'assets/icons/tabs/settings.svg',
    title: 'Settings',
    routePath: ERoutes.SETTINGS,
  },
  [EPages.ABOUT]: {
    iconPath: 'assets/icons/tabs/about.svg',
    title: 'About',
    routePath: ERoutes.ABOUT,
  },
};
