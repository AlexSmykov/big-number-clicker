import { TSidebarButton } from 'src/app/components/sidebar/sidebar.interface';
import { ERoutes } from 'src/app/core/router-paths';

export const SIDEBAR_BUTTONS: TSidebarButton[] = [
  {
    iconPath: 'assets/icons/tabs/main.svg',
    title: 'Main',
    routePath: ERoutes.MAIN,
  },
  {
    iconPath: 'assets/icons/tabs/upgrades.svg',
    title: 'Upgrades',
    routePath: ERoutes.UPGRADES,
  },
  {
    iconPath: 'assets/icons/tabs/prestige.svg',
    title: 'Prestige',
    routePath: ERoutes.PRESTIGE,
  },
  {
    iconPath: 'assets/icons/tabs/settings.svg',
    title: 'Settings',
    routePath: ERoutes.SETTINGS,
  },
  {
    iconPath: 'assets/icons/tabs/about.svg',
    title: 'About',
    routePath: ERoutes.ABOUT,
  },
];
