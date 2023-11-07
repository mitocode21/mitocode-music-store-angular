import { Routes } from '@angular/router';
import {
	PATHS_AUTH_PAGES,
	PATH_BUY_PAGES,
	PATH_MAINTENANCE_PAGES,
	PATH_MY_ACCOUNT_PAGES,
	PATH_NOT_FOUND_PAGE
} from './commons/config/path-pages';
import { NewAuthGuard } from './commons/guards/auth.guard';
import { NewBuyGuard } from './commons/guards/buy.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const ROUTES_ROOT: Routes = [
	{
		path: '',
		canActivate: [NewBuyGuard],
		component: HomePageComponent
	},
	{
		path: PATHS_AUTH_PAGES.loginPage.onlyPath,
		title: 'Inicio de sesión',
		loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule)
	},
	{
		path: PATHS_AUTH_PAGES.registerPage.onlyPath,
		title: 'Registro de usuario',
		loadComponent: () => import('./pages/register-page/register-page.component')
	},
	{
		path: `${PATHS_AUTH_PAGES.recoverPasswordPage.onlyPath}`,
		title: 'Recuperar contraseña',
		loadComponent: () => import('./pages/recovery-password-page/recovery-password-page.component')
	},
	{
		path: `${PATHS_AUTH_PAGES.restorePasswordPage.onlyPath}/:email`,
		title: 'Restaurar contraseña',
		loadComponent: () => import('./pages/restore-password-page/restore-password-page.component')
	},
	{
		path: PATH_BUY_PAGES.buyPage.onlyPath,
		title: 'Compra de entradas',
		canActivate: [NewBuyGuard],
		loadComponent: () => import('./pages/buy-page/buy-page.component')
	},
	{
		path: PATH_MAINTENANCE_PAGES.onlyPath,
		canActivate: [NewAuthGuard],
		loadChildren: () => import('./pages/maintenance/maintenance.routes')
	},
	{
		path: PATH_MY_ACCOUNT_PAGES.onlyPath,
		loadComponent: () => import('./pages/my-account/my-account.component')
	},
	{
		path: PATH_NOT_FOUND_PAGE['not-found'].onlyPath,
		title: '404 | no se encuentra la página',
		loadComponent: () => import('./pages/not-found-page/not-found-page.component')
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: PATH_NOT_FOUND_PAGE['not-found'].onlyPath
	}
];
