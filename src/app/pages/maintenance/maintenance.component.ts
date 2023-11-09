import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';
import { PATH_MAINTENANCE_PAGES } from '../../commons/config/path-pages';
import { ICardMenu } from '../../commons/models/components.interface';
import { ConcertApiService, GenreApiService, ReportsApiService } from './services/service-index';

@Component({
	standalone: true,
	selector: 'app-maintenance',
	templateUrl: './maintenance.component.html',
	styleUrls: ['./maintenance.component.scss'],
	imports: [CardMenusComponent, RouterOutlet],
	providers: [ConcertApiService, GenreApiService, ReportsApiService]
})
export class MaintenanceComponent {
	readonly menuAdmin: ICardMenu[] = [
		{
			title: 'VENTAS',
			nameImage: 'buys.png',
			path: PATH_MAINTENANCE_PAGES.buy.withSlash
		},
		{
			title: 'EVENTOS',
			nameImage: 'events.png',
			path: PATH_MAINTENANCE_PAGES.events.withSlash
		},
		{
			title: 'GENEROS',
			nameImage: 'genres.png',
			path: PATH_MAINTENANCE_PAGES.genres.withSlash
		},
		{
			title: 'REPORTES',
			nameImage: 'statistics.png',
			path: PATH_MAINTENANCE_PAGES.reports.withSlash
		}
	];
}
