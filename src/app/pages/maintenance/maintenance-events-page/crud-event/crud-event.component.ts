import { Component, OnInit, inject } from '@angular/core';
import { CRUD_METHOD } from '../../../../commons/models/enums';
import { IResponseGenre } from '../../services/genre/genre-api-model.interface';
import { GenreApiService } from '../../services/service-index';
import { EventsService } from '../events.service';

@Component({
	selector: 'app-crud-event',
	templateUrl: './crud-event.component.html',
	styleUrls: ['./crud-event.component.scss']
})
export class CrudEventComponent implements OnInit {
	private _genreApiService = inject(GenreApiService);

	eventsService = inject(EventsService);

	listGenres: IResponseGenre[] = [];

	ngOnInit(): void {
		this._loadGenres();
	}

	private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			this.listGenres = response.data;
		});
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				const resultImageFile = reader.result!.toString();
				this.eventsService.fileNameField.setValue(htmlInput.files![0].name);
				this.eventsService.imageField.setValue(resultImageFile);
			};
		}
	}
	clickSave(): void {
		this.eventsService.saveEvent();
	}

	clickClear(): void {
		this.eventsService.crudMethod = CRUD_METHOD.SAVE;
		this.eventsService.eventsFormGroup.reset();
	}
}
