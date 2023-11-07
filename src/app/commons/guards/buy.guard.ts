import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { DataUserService } from '../services/local/data-user.service';
import { PATH_MAINTENANCE_PAGES } from './../config/path-pages';

@Injectable({
	providedIn: 'root'
})
export class BuyGuard implements CanActivate {
	private dataUserService = inject(DataUserService);
	private router = inject(Router);

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
		if (this.dataUserService.getDataUser()?.isAdmin === true) {
			this.router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
			return false;
		}

		return true;
	}
}

//#region NUEVO ENFOQUE PARA USAR GUARDS

export const NewBuyGuard: CanActivateFn = (route, state) => {
	const dataUserService = inject(DataUserService);
	const router = inject(Router);

	if (dataUserService.getDataUser()?.isAdmin === true) {
		router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
		return false;
	}

	return true;
};
//#endregion
