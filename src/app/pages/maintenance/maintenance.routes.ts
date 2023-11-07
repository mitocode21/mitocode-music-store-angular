import { Routes } from '@angular/router';
import { PATH_MAINTENANCE_PAGES } from '../../commons/config/path-pages';
import { NewMaintenanceGuard } from '../../commons/guards/maintenance.guard';
import { MaintenanceComponent } from './maintenance.component';

export default [
	{
		path: '',
		component: MaintenanceComponent,
		canActivateChild: [NewMaintenanceGuard],
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				title: 'Eventos vendidos',
				loadComponent: () => import('./maintenance-buy-page/maintenance-buy-page.component')
			},
			{
				path: PATH_MAINTENANCE_PAGES.events.onlyPath,
				title: 'Eventos',
				loadComponent: () => import('./maintenance-events-page/maintenance-events-page.component')
			},
			{
				path: PATH_MAINTENANCE_PAGES.reports.onlyPath,
				title: 'Reporte de ventas',
				loadComponent: () => import('./maintenance-reports/maintenance-reports.component')
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PATH_MAINTENANCE_PAGES.buy.onlyPath
			}
		]
	}
] as Routes;
