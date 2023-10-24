import { LowerCasePipe, NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { ICardEvent } from '../../commons/models/components.interface';
import { IHomeGenres } from '../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [SharedFormCompleteModule, CardEventComponent, UpperCasePipe, LowerCasePipe, NgFor]
})
export class HomePageComponent implements OnInit {
	listGenres: IHomeGenres[] = [];
	listConcerts: ICardEvent[] = [];

	private _homeApiService = inject(HomeApiService);

	ngOnInit(): void {
		this._loadHome();
	}

	private _loadHome() {
		this._homeApiService.getHome().subscribe((response) => {
			this.listGenres = response.genres;
			this.listConcerts = response.getDataCardEvent();
		});
	}
}
