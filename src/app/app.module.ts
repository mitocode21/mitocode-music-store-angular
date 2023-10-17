import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardEventComponent } from './commons/components/card-event/card-event.component';
import { CardMenusComponent } from './commons/components/card-menus/card-menus.component';
import { FooterComponent } from './commons/components/container/components/footer/footer.component';
import { HeaderComponent } from './commons/components/container/components/header/header.component';
import { ContainerComponent } from './commons/components/container/container.component';
import { BuyPageComponent } from './pages/buy-page/buy-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaintenanceBuyPageComponent } from './pages/maintenance/maintenance-buy-page/maintenance-buy-page.component';
import { CrudEventComponent } from './pages/maintenance/maintenance-events-page/crud-event/crud-event.component';
import { EventTableComponent } from './pages/maintenance/maintenance-events-page/event-table/event-table.component';
import { MaintenanceEventsPageComponent } from './pages/maintenance/maintenance-events-page/maintenance-events-page.component';
import { MaintenanceReportsComponent } from './pages/maintenance/maintenance-reports/maintenance-reports.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { AccountBuyPageComponent } from './pages/my-account/account-buy-page/account-buy-page.component';
import { AccountChangePasswordPageComponent } from './pages/my-account/account-change-password-page/account-change-password-page.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RecoveryPasswordPageComponent } from './pages/recovery-password-page/recovery-password-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		AccountBuyPageComponent,
		AccountChangePasswordPageComponent,
		CardMenusComponent,
		MaintenanceComponent,
		MyAccountComponent,
		ContainerComponent,
		HeaderComponent,
		FooterComponent,
		CardEventComponent,
		RegisterPageComponent,
		LoginPageComponent,
		MaintenanceBuyPageComponent,
		MaintenanceEventsPageComponent,
		BuyPageComponent,
		MaintenanceReportsComponent,
		RecoveryPasswordPageComponent,
		RestorePasswordPageComponent,
		NotFoundPageComponent,
		CrudEventComponent,
		EventTableComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatSelectModule,
		MatTabsModule,
		MatIconModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTableModule,
		MatMenuModule,
		MatPaginatorModule
	],

	bootstrap: [AppComponent]
})
export class AppModule {}
