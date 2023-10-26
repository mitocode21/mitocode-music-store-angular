// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
// 	.bootstrapModule(AppModule)
// 	.catch((err) => console.error(err));

//#region  CONFIGURACIÓN PARA INICIAR EL COMPONENTE ROOT EN MODO STANDALONE
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';

import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppStandaloneComponent } from './app/app-standalone.component';
import { ROUTES_ROOT } from './app/app-standalone.routes';

registerLocaleData(LocaleEsPe);

bootstrapApplication(AppStandaloneComponent, {
	providers: [
		provideAnimations(),
		provideRouter(ROUTES_ROOT),
		provideHttpClient(),
		{ provide: LOCALE_ID, useValue: 'es-PE' }
	]
});
//#endregion
