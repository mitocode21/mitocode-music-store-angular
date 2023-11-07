import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	ConfirmBoxConfigModule,
	DialogConfigModule,
	NgxAwesomePopupModule,
	ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule } from './commons/components/container/container.module';
import { ApiInterceptor } from './commons/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';

registerLocaleData(LocaleEsPe);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		ContainerModule,
		NgxUiLoaderModule,
		NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
		DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
		ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
		ToastNotificationConfigModule.forRoot()
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorApiInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
