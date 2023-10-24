import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../../../commons/services/api/api-models-base.interface';
import { environment } from './../../../../../environments/environment';
import { IResponseReportSale } from './reports-api-model.interface';

const URL_REPORT_SALE = environment.host + '/Reports';

@Injectable()
export class ReportsApiService {
	private _httpClient = inject(HttpClient);

	getDataSale(dateInit: string, dateEnd: string): Observable<IResponse<IResponseReportSale[]>> {
		const params = new HttpParams().set('startDate', dateInit).set('endDate', dateEnd);
		return this._httpClient.get<IResponse<IResponseReportSale[]>>(URL_REPORT_SALE, { params });
	}
}
