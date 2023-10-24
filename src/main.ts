// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
// 	.bootstrapModule(AppModule)
// 	.catch((err) => console.error(err));

//#region  CONFIGURACIÓN PARA INICIAR EL COMPONENTE ROOT EN MODO STANDALONE
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppStandaloneComponent } from './app/app-standalone.component';
import { ROUTES_ROOT } from './app/app-standalone.routes';

bootstrapApplication(AppStandaloneComponent, {
	providers: [provideAnimations(), provideRouter(ROUTES_ROOT), provideHttpClient()]
});
//#endregion
