import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule } from './commons/components/container/container.module';

registerLocaleData(LocaleEsPe);

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, ContainerModule],
	providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
	bootstrap: [AppComponent]
})
export class AppModule {}
