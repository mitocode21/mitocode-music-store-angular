import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IResponseGenre } from '../../services/genre/genre-api-model.interface';
import { ConcertApiService, GenreApiService } from '../../services/service-index';

@Component({
	selector: 'app-crud-event',
	templateUrl: './crud-event.component.html',
	styleUrls: ['./crud-event.component.scss']
})
export class CrudEventComponent implements OnInit {
	private readonly _genreApiService = inject(GenreApiService);
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _concertApiService = inject(ConcertApiService);

	formGroup = this._formBuilder.nonNullable.group({
		id: [0, Validators.required],
		title: ['', Validators.required],
		description: ['', Validators.required],
		date: [new Date(), Validators.required],
		hour: ['', Validators.required],
		ticketsQuantity: [0, Validators.required],
		price: [0, Validators.required],
		place: ['', Validators.required],
		status: [0, Validators.required],
		genre: this._formBuilder.control<number | null>(null),
		image: ['', Validators.required],
		fileName: ['', Validators.required]
	});

	listGenres: IResponseGenre[] = [];

	ngOnInit(): void {
		this._loadGenres();
		this._loadEvents();
	}

	private _loadEvents(): void {
		this._concertApiService.getListConcerts(1, 5).subscribe((response) => {
			console.log(response);
		});
	}

	private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.data) {
				this.listGenres = response.data;
			}
		});
	}

	clickSave(): void {
		console.log(this.formGroup.getRawValue());
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				const resultImageFile = reader.result!.toString();
				this.fileNameField.setValue(htmlInput.files![0].name);
				this.imageField.setValue(resultImageFile);
			};
		}
	}

	get idField(): FormControl<number | null> {
		return this.formGroup.controls.id;
	}

	get titleField(): FormControl<string> {
		return this.formGroup.controls.title;
	}

	get descriptionField(): FormControl<string> {
		return this.formGroup.controls.description;
	}

	get dateField(): FormControl<Date> {
		return this.formGroup.controls.date;
	}

	get hourField(): FormControl<string> {
		return this.formGroup.controls.hour;
	}

	get ticketsQuantityField(): FormControl<number> {
		return this.formGroup.controls.ticketsQuantity;
	}

	get priceField(): FormControl<number> {
		return this.formGroup.controls.price;
	}

	get placeField(): FormControl<string> {
		return this.formGroup.controls.place;
	}

	get genreField(): FormControl<number | null> {
		return this.formGroup.controls.genre;
	}

	get statusField(): FormControl<number> {
		return this.formGroup.controls.status;
	}

	get imageField(): FormControl<string> {
		return this.formGroup.controls.image;
	}

	get fileNameField(): FormControl<string | null> {
		return this.formGroup.controls.fileName;
	}
}
