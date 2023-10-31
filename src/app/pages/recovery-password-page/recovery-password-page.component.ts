import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { IResponse } from '../../commons/services/api/api-models-base.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';

@Component({
	standalone: true,
	selector: 'app-recovery-password-page',
	templateUrl: './recovery-password-page.component.html',
	styleUrls: ['./recovery-password-page.component.scss'],
	imports: [RouterLink, SharedFormBasicModule, NgIf]
})
export default class RecoveryPasswordPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;

	showFieldPassword = false;
	disabledButton = false;

	private readonly _router = inject(Router);
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _userApiService = inject(UserApiService);

	formGroup = this._formBuilder.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });

	clickSendEmail(): void {
		if (this.formGroup.valid) {
			const email = this.emailField.value;

			this.disabledButton = true;

			this._userApiService.sendTokenToResetPassword(email).subscribe({
				next: (response) => {
					if (response) {
						this._validResponseAndRedirect(response, email);
					}
				},
				error: () => {
					this.disabledButton = false;
				}
			});
		}
	}

	private _validResponseAndRedirect(response: IResponse<string>, email: string): void {
		if (response.success) {
			const url = PATHS_AUTH_PAGES.restorePasswordPage.withSlash + '/' + email;

			/**
			 * Enviamos datos a traves de las rutas usando queryParams,
			 * al hacerlo de esta manera los datos enviados se mostraran en la url
			 */
			//void this._router.navigate([url], { queryParams: { token: response.data } });

			/**
			 * Enviamos datos a traves de las rutas gracias a la opción "state",
			 * al hacerlo de esta manera evitamos mostrar la información en la url, pero recuerda que si actualizas la pagina los datos se perderan
			 */
			void this._router.navigate([url], { state: { token: response.data } });
		} else {
			this.disabledButton = false;
		}
	}

	get emailField(): FormControl<string> {
		return this.formGroup.controls.email;
	}
}
