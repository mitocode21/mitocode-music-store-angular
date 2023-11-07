import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../config/path-pages';
import { ChannelHeaderService } from '../services/local/channel-header.service';
import { DataUserService } from '../services/local/data-user.service';
import { SessionStorageService } from '../services/local/storage/storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	private _dataUserService = inject(DataUserService);
	private _channelHeaderService = inject(ChannelHeaderService);
	private _sessionStorageService = inject(SessionStorageService);
	private _router = inject(Router);
	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
		const isExpiredToken = this._dataUserService.isExpiredToken();

		if (isExpiredToken) {
			this._channelHeaderService.showUser(false);
			this._sessionStorageService.clear();
			this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return false;
		}

		return true;
	}
}

export const NewAuthGuard: CanActivateFn = (route, state) => {
	const dataUserService = inject(DataUserService);
	const channelHeaderService = inject(ChannelHeaderService);
	const sessionStorageService = inject(SessionStorageService);
	const router = inject(Router);

	const isExpiredToken = dataUserService.isExpiredToken();

	if (isExpiredToken) {
		channelHeaderService.showUser(false);
		sessionStorageService.clear();
		router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
		return false;
	}

	return true;
};
