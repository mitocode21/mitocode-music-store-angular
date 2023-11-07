import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { URL_HOME } from '../services/api/home/home-api.service';
import {
	URL_LOGIN,
	URL_REGISTER,
	URL_RESET_PASSWORD,
	URL_SEND_TOKEN_RESET_PASSWORD
} from '../services/api/user/user-api.service';
import { DataUserService } from '../services/local/data-user.service';

const EXEMPTED_URLS = [URL_LOGIN, URL_REGISTER, URL_HOME, URL_SEND_TOKEN_RESET_PASSWORD, URL_RESET_PASSWORD];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	private _dataUserService = inject(DataUserService);
	private _router = inject(Router);

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// agregar headers -> TOKEN
		if (this.isExempted(request.url)) {
			return next.handle(request);
		}

		if (this._dataUserService.isExpiredToken()) {
			this._router.navigateByUrl('/');
			return EMPTY;
		}

		const token = this._dataUserService.getDataUser()!.token;
		const requestClone = request.clone({
			headers: request.headers.set('Authorization', `Bearer ${token}`)
		});

		return next.handle(requestClone);
	}

	private isExempted(url: string): boolean {
		const exist = EXEMPTED_URLS.find((item) => item === url);
		return exist !== undefined;
	}
}

export const NewApiInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
	console.log('----NewApiInterceptor-----');

	const dataUser = inject(DataUserService);
	const router = inject(Router);

	if (isExempted(request.url)) {
		return next(request);
	}

	if (dataUser.isExpiredToken()) {
		void router.navigateByUrl('/');
		return EMPTY;
	}

	const token = dataUser.getDataUser()!.token;

	const requestClone = request.clone({
		headers: request.headers.set('Authorization', `Bearer ${token!}`)
	});

	return next(requestClone);
};

const isExempted = (url: string): boolean => {
	const exist = EXEMPTED_URLS.find((item) => item === url);
	return exist !== undefined;
};
