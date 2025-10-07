// app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router'; // Asegúrate de importar withRouterConfig

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // 🔑 CLAVE: Fuerza la recarga cuando solo cambian los queryParams.
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    )
  ]
};