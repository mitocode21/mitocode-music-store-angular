import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../../../commons/services/api/api-models-base.interface';
import { environment } from './../../../../../environments/environment';
import { IRequestCreateUpdateGenre, IResponseGenre } from './genre-api-model.interface';

export const URL_GENRE = environment.host + '/Genres';

@Injectable()
export class GenreApiService {
	private _httpClient = inject(HttpClient);

	createGenre(request: IRequestCreateUpdateGenre): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_GENRE, request);
	}

	getGenres(): Observable<IResponse<IResponseGenre[]>> {
		return this._httpClient.get<IResponse<IResponseGenre[]>>(URL_GENRE);
	}

	getGenre(id: number): Observable<IResponse<IResponseGenre>> {
		const url = `${URL_GENRE}/${id}`;
		return this._httpClient.get<IResponse<IResponseGenre>>(url);
	}

	updateGenre(id: number, request: Partial<IRequestCreateUpdateGenre>): Observable<IResponse<number>> {
		const url = `${URL_GENRE}/${id}`;
		return this._httpClient.put<IResponse<number>>(url, request);
	}

	deleteGenre(id: number): Observable<IResponse<number>> {
		const url = `${URL_GENRE}/${id}`;
		return this._httpClient.delete<IResponse<number>>(url);
	}
}
