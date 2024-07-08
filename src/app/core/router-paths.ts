export enum ERoutes {
  MAIN = 'MAIN',
  UPGRADES = 'UPGRADES',
  PRESTIGE = 'PRESTIGE',
  SETTINGS = 'SETTINGS',
  ABOUT = 'ABOUT',
}

enum ERoutesParts {
  MAIN = 'main',
  UPGRADES = 'upgrades',
  PRESTIGE = 'prestige',
  SETTINGS = 'settings',
  ABOUT = 'about',
}

export const EPartialRoutes: Record<ERoutes, string> = {
  MAIN: ERoutesParts.MAIN,
  UPGRADES: ERoutesParts.UPGRADES,
  PRESTIGE: ERoutesParts.PRESTIGE,
  SETTINGS: ERoutesParts.SETTINGS,
  ABOUT: ERoutesParts.ABOUT,
};

export const EFullRoutes: Record<ERoutes, string[]> = {
  MAIN: ['/', ERoutesParts.MAIN],
  UPGRADES: ['/', ERoutesParts.UPGRADES],
  PRESTIGE: ['/', ERoutesParts.PRESTIGE],
  SETTINGS: ['/', ERoutesParts.SETTINGS],
  ABOUT: ['/', ERoutesParts.ABOUT],
};
