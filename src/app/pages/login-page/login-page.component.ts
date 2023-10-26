import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES } from '../../commons/config/path-pages';
import { ChannelHeaderService } from '../../commons/services/local/channel-header.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	readonly title = 'INICIO DE SESIÓN';
	readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;

	private readonly _channelHeaderService = inject(ChannelHeaderService);
	private readonly _router = inject(Router);

	clickLogin(): void {
		this._channelHeaderService.showUser(true);
		this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
	}
}
