import { Route } from '@angular/router';

import { EPartialRoutes } from 'src/app/core/router-paths';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: EPartialRoutes.MAIN,
      },
      {
        path: EPartialRoutes.MAIN,
        title: 'Main page',
        loadComponent: () => import('src/app/pages/main/main-page.component'),
      },
      {
        path: EPartialRoutes.UPGRADES,
        title: 'Upgrades',
        loadComponent: () =>
          import('src/app/pages/upgrades/upgrades-page.component'),
      },
      {
        path: EPartialRoutes.PRESTIGE,
        title: 'Prestige room',
        loadComponent: () =>
          import('src/app/pages/prestige/prestige-page.component'),
      },
      {
        path: EPartialRoutes.SETTINGS,
        title: 'Very useful settings',
        loadComponent: () =>
          import('src/app/pages/settings/settings-page.component'),
      },
      {
        path: EPartialRoutes.ABOUT,
        title: 'About this game',
        loadComponent: () => import('src/app/pages/about/about-page.component'),
      },
    ],
  },
] satisfies Route[];
