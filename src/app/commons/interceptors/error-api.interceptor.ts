import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHandlerFn,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable()
export class ErrorApiInterceptor implements HttpInterceptor {
	private readonly _ngxService = inject(NgxUiLoaderService);
	private readonly _toastEvokeService = inject(ToastEvokeService);

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.log('----ErrorApiInterceptor----');
		this._ngxService.start();

		return next.handle(request).pipe(
			finalize(() => this._ngxService.stop()),
			catchError((error: HttpErrorResponse) => {
				this.errorsHttpClient(error);
				return throwError(() => error);
			})
		);
	}

	private errorsHttpClient(httpErrorResponse: HttpErrorResponse): void {
		switch (httpErrorResponse.status) {
			case 0:
			case 500:
			case 400:
				this._toastEvokeService.danger('Error', 'Ups,ocurrio un error inesperado, intenta nuevamente.');
				break;
			case 401:
				this._toastEvokeService.danger('Error', 'No estas autorizado.');
				break;
			case 404:
				this._toastEvokeService.danger('Error', 'No pudimos encontrar tu solicitud, intenta más tarde.');
				break;
		}
	}
}

//#region NUEVO ENFOQUE PARA USAR INTERCEPTORES

export const NewErrorApiInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
	console.log('-----NewErrorApiInterceptor---------');

	const ngxService = inject(NgxUiLoaderService);

	ngxService.start();
	return next(request).pipe(
		finalize(() => {
			ngxService.stop();
		}),
		catchError((error: HttpErrorResponse) => {
			errorsHttpClient(error);
			return throwError(() => error);
		})
	);
};

const errorsHttpClient = (httpErrorResponse: HttpErrorResponse): void => {
	const toastEvokeService = inject(ToastEvokeService);

	switch (httpErrorResponse.status) {
		case 0:
		case 500:
		case 400:
			toastEvokeService!.danger('Error', 'Ups,ocurrio un error inesperado, intenta nuevamente.');
			break;
		case 404:
			toastEvokeService!.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
			break;
	}
};

//#endregion
