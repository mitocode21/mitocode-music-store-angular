import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { IDataUser } from '../../models/data-user';
import { KEYS_WEB_STORAGE } from '../../models/enums';
import { SessionStorageService } from './storage/storage.service';

@Injectable({ providedIn: 'root' })
export class DataUserService {
	private _sessionStorageService = inject(SessionStorageService);

	getDataUser(): IDataUser | undefined {
		const tokenUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);
		return tokenUser;
	}

	isExpiredToken(): boolean {
		try {
			const dataUser = this.getDataUser();
			if (dataUser && dataUser.token) {
				const decoded = jwtDecode<JwtPayload>(dataUser.token);
				const tokenExpired = Date.now() > decoded.exp! * 1000;

				return tokenExpired;
			}
			return true;
		} catch (error) {
			console.error(error);
			return true;
		}
	}
}
