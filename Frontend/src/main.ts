import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appRoutes } from './app/app.routes';  // ✅ Asegúrate de tener este archivo
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(appRoutes) // ✅ Esto hace disponible Router en toda la app
  ]
}).catch((err) => console.error(err));