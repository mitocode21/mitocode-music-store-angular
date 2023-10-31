import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from '../../commons/config/path-pages';
import { IDataUser } from '../../commons/models/data-user';
import { KEYS_WEB_STORAGE } from '../../commons/models/enums';
import { IResponseLogin } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { ChannelHeaderService } from '../../commons/services/local/channel-header.service';
import { SessionStorageService } from '../../commons/services/local/storage/storage.service';

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
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _userApiService = inject(UserApiService);
	private _sessionStorageService = inject(SessionStorageService);

	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group({
		email: ['admin@gmail.com', [Validators.required, Validators.email]],
		password: ['Admin1234*', Validators.required]
	});

	clickLogin(): void {
		if (this.formGroup.valid) {
			this.disabledButton = true;
			// const email = this.formGroup.controls.email.value;
			// const password = this.formGroup.controls.password.value;
			const { email, password } = this.formGroup.getRawValue();

			this._userApiService.login({ userName: email, password }).subscribe({
				next: (response) => {
					this._saveDataUserAndRedirect(response);
				},
				error: () => {
					this.disabledButton = false;
				}
			});
		}
	}

	private _saveDataUserAndRedirect(response: IResponseLogin): void {
		const dataUser: IDataUser = {
			token: response.token,
			fullName: response.fullName,
			isAdmin: response.roles[0] === 'Administrator'
		};

		this._sessionStorageService.setItem(KEYS_WEB_STORAGE.DATA_USER, dataUser);
		this._redirectUser(dataUser.isAdmin);
	}

	private _redirectUser(isAdmin: boolean): void {
		const url = isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.withSlash;
		this._router.navigateByUrl(url);
		this._channelHeaderService.showUser(true);
	}
}
