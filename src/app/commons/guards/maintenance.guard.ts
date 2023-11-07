import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../config/path-pages';
import { DataUserService } from '../services/local/data-user.service';

export const NewMaintenanceGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const dataUserService = inject(DataUserService);
	const router = inject(Router);

	const user = dataUserService.getDataUser();
	if (!user || user.isAdmin === false) {
		router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
		return false;
	}

	return true;
};
