import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import {
  popperVariation,
  provideTippyConfig,
  tooltipVariation,
} from '@ngneat/helipopper';

import routes from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAngularSvgIcon(),
    provideHttpClient(),
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      },
    }),
  ],
};
