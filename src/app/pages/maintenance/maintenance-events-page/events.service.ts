import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { EMPTY, Observable, Subject, concatMap, map, of } from 'rxjs';
import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/models/enums';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import { IRequestCreateUpdateConcert, IResponseConcert } from '../services/concerts/concert-api-model.interface';
import { ConcertApiService } from '../services/service-index';

@Injectable()
export class EventsService {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _eventApiService = inject(ConcertApiService);
	private readonly _datePipe = inject(DatePipe);
	private readonly _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
	private readonly _toastEvokeService = inject(ToastEvokeService);

	private readonly crudSource = new Subject<boolean>();
	channelCrudEvent$ = this.crudSource.asObservable();

	crudMethod = CRUD_METHOD.SAVE;

	eventsFormGroup = this._formBuilder.nonNullable.group({
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

	deleteEvent(idEvent: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Evento', '¿Esta seguro de eliminar el Evento?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) =>
				responseQuestion.success ? this._eventApiService.deleteConcert(idEvent) : EMPTY
			),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El evento a sido eliminado');
					return of(true);
				}
				return of(false);
			})
		);
	}

	endEvent(idEvent: number): void {
		this._confirmBoxEvokeService
			.warning('Concierto', '¿Esta seguro de finalizar el Concierto?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) =>
					responseQuestion.success ? this._eventApiService.finalizeConcert(idEvent) : EMPTY
				)
			)
			.subscribe(() => {
				this._toastEvokeService.success('Exito', 'El concierto a sido finalizado');
			});
	}

	updateForm(idEvent: number): Observable<IResponse<IResponseConcert>> {
		return this._eventApiService.getConcert(idEvent).pipe(
			map((response) => {
				const eventResponse = response.data;
				this.idField.setValue(eventResponse.id);
				this.titleField.setValue(eventResponse.title);
				this.descriptionField.setValue(eventResponse.description);
				this.dateField.setValue(new Date(eventResponse.dateEvent));
				this.hourField.setValue(this._datePipe.transform(eventResponse.dateEvent, 'HH:mm')!);
				this.placeField.setValue(eventResponse.place);
				this.ticketsQuantityField.setValue(eventResponse.ticketsQuantity);
				this.priceField.setValue(eventResponse.unitPrice),
					this.genreField.setValue(eventResponse.genreId),
					this.statusField.setValue(eventResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
				this.imageField.setValue(eventResponse.imageUrl);

				this.crudMethod = CRUD_METHOD.UPDATE;
				return response;
			})
		);
	}

	saveEvent(): void {
		if (this.eventsFormGroup.valid) {
			this._confirmBoxEvokeService
				.warning('Evento', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
				.pipe(concatMap((responseQuestion) => (responseQuestion.success ? this._getMethod() : EMPTY)))
				.subscribe(() => {
					this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
					this.eventsFormGroup.reset();
				});
		}
	}

	private _getMethod(): Observable<IResponse<number>> {
		const idEvent = this.idField.value as number;
		const request = this._getRequest();
		return this.crudMethod === CRUD_METHOD.SAVE
			? this._eventApiService.createConcert(request)
			: this._eventApiService.updateConcert(idEvent, request);
	}

	/**
	 * En esta función vamos a retornar el evento que deseamos guardar o modificar; en el caso de las imagenes puede que al momento de seleccionar el evento para poder modificarlo solo modifiquen atributos de texto o número por lo tanto el valor de la imagen es solo una URL asi que no se debería de enviar, recuerden que el API necesita un base64 para crear una imagen.
	 * @param method
	 * @returns
	 */
	private _getRequest(): IRequestCreateUpdateConcert {
		const request: IRequestCreateUpdateConcert = <IRequestCreateUpdateConcert>{
			title: this.titleField.value,
			description: this.descriptionField.value,
			dateEvent: this._datePipe.transform(this.dateField.value, 'yyyy-MM-dd'),
			timeEvent: this.hourField.value,
			ticketsQuantity: this.ticketsQuantityField.value,
			unitPrice: this.priceField.value,
			idGenre: this.genreField.value,
			place: this.placeField.value
		};

		const existHttpMitocode = this.imageField.value.search('https://mitocode.blob.core.windows.net');

		if (this.crudMethod === CRUD_METHOD.SAVE || (this.crudMethod == CRUD_METHOD.UPDATE && existHttpMitocode === -1)) {
			const base64 = this.imageField.value.split(',')[1];
			request.base64Image = base64;
			request.fileName = this.fileNameField.value!;
		}

		return request;
	}

	//#region
	get idField(): FormControl<number | null> {
		return this.eventsFormGroup.controls.id;
	}

	get titleField(): FormControl<string> {
		return this.eventsFormGroup.controls.title;
	}

	get descriptionField(): FormControl<string> {
		return this.eventsFormGroup.controls.description;
	}

	get dateField(): FormControl<Date> {
		return this.eventsFormGroup.controls.date;
	}

	get hourField(): FormControl<string> {
		return this.eventsFormGroup.controls.hour;
	}

	get ticketsQuantityField(): FormControl<number> {
		return this.eventsFormGroup.controls.ticketsQuantity;
	}

	get priceField(): FormControl<number> {
		return this.eventsFormGroup.controls.price;
	}

	get placeField(): FormControl<string> {
		return this.eventsFormGroup.controls.place;
	}

	get genreField(): FormControl<number | null> {
		return this.eventsFormGroup.controls.genre;
	}

	get statusField(): FormControl<number> {
		return this.eventsFormGroup.controls.status;
	}

	get imageField(): FormControl<string> {
		return this.eventsFormGroup.controls.image;
	}

	get fileNameField(): FormControl<string | null> {
		return this.eventsFormGroup.controls.fileName;
	}
	//#endregion
}
