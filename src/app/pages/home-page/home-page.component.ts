import { LowerCasePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { PATH_BUY_PAGES } from '../../commons/config/path-pages';
import { ICardEvent } from '../../commons/models/components.interface';
import { IHomeGenres } from '../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

type StateLoadin = 'LOADING' | 'ERROR' | 'EMPTY' | 'READY';
@Component({
	standalone: true,
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [SharedFormCompleteModule, CardEventComponent, UpperCasePipe, LowerCasePipe, NgFor, NgIf]
})
export class HomePageComponent implements OnInit {
	listGenres: IHomeGenres[] = [];
	listConcerts: ICardEvent[] = [];
	private readonly _homeApiService = inject(HomeApiService);
	private readonly _router = inject(Router);

	stateLoading = signal<StateLoadin>('LOADING');

	titleSignalFunction = computed(() => {
		console.log('-----GENERANDO TEXTO-------');

		if (this.stateLoading() === 'LOADING') return 'Cargando los conciertos...';
		if (this.stateLoading() === 'ERROR') return 'Ocurrio un error, intenta más tarde';
		if (this.stateLoading() === 'EMPTY') return 'No hay conciertos disponibles.';

		return 'Disfruta de los mejores conciertos';
	});

	ngOnInit(): void {
		this._loadHome();
	}

	clickCard(event: ICardEvent): void {
		this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], { state: { event } });
	}

	private _loadHome() {
		this._homeApiService.getHome().subscribe({
			next: (response) => {
				this.listGenres = response.genres;
				this.listConcerts = response.getDataCardEvent();
				this.stateLoading.set(this.listConcerts && this.listConcerts.length === 0 ? 'EMPTY' : 'READY');
			},
			error: () => {
				this.stateLoading.set('ERROR');
			}
		});
	}

	getMessage(): string {
		console.log('---getMessage---');
		return 'Selecciona tu género musical favorito';
	}
}
