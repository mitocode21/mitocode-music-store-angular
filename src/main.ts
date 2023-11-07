// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
// 	.bootstrapModule(AppModule)
// 	.catch((err) => console.error(err));

//#region  CONFIGURACIÓN PARA INICIAR EL COMPONENTE ROOT EN MODO STANDALONE
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';

import { HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
	ConfirmBoxConfigModule,
	DialogConfigModule,
	NgxAwesomePopupModule,
	ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { AppStandaloneComponent } from './app/app-standalone.component';
import { ROUTES_ROOT } from './app/app-standalone.routes';
import { NewApiInterceptor } from './app/commons/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './app/commons/interceptors/error-api.interceptor';
registerLocaleData(LocaleEsPe);

bootstrapApplication(AppStandaloneComponent, {
	providers: [
		provideAnimations(),
		provideRouter(ROUTES_ROOT),
		provideHttpClient(withInterceptors([NewApiInterceptor]), withInterceptorsFromDi()),
		importProvidersFrom([
			NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
			DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
			ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
			ToastNotificationConfigModule.forRoot()
		]),
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorApiInterceptor,
			multi: true
		}
	]
});
//#endregion
