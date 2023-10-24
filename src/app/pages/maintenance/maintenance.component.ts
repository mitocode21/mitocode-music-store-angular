import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';
import { ConcertApiService, GenreApiService, ReportsApiService, SaleApiService } from './services/service-index';

@Component({
	standalone: true,
	selector: 'app-maintenance',
	templateUrl: './maintenance.component.html',
	styleUrls: ['./maintenance.component.scss'],
	imports: [CardMenusComponent, RouterOutlet],
	providers: [ConcertApiService, GenreApiService, ReportsApiService, SaleApiService]
})
export class MaintenanceComponent {
	private _homeApiService = inject(ConcertApiService);
}
