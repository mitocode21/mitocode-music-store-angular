import { NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { IResponse } from '../../commons/services/api/api-models-base.interface';
import { IRequestResetPassword } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';
import { customPasswordValidator } from '../../commons/validators/forms.validator';

@Component({
	standalone: true,
	selector: 'app-restore-password-page',
	templateUrl: './restore-password-page.component.html',
	styleUrls: ['./restore-password-page.component.scss'],
	imports: [RouterLink, SharedFormBasicModule, NgIf]
})
export default class RestorePasswordPageComponent implements OnInit {
	@Input() email?: string;
	@Input() id?: string;
	@Input() value?: string;
	@Input() token?: string;

	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;

	private readonly _router = inject(Router);
	private readonly _activatedRoute = inject(ActivatedRoute);
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _userApiService = inject(UserApiService);

	private _token?: string;
	private _email?: string;

	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group({
		password: ['', [Validators.required, customPasswordValidator]]
	});

	constructor() {
		// this._captureData();
	}
	ngOnInit(): void {
		console.log('email--->', this.email);
		console.log('id--->', this.id);
		console.log('value--->', this.value);
	}

	clickRestore(): void {
		if (this.formGroup.valid) {
			const request: IRequestResetPassword = {
				email: this._email!,
				token: this._token!,
				newPassword: this.passwordField.value
			};

			this._userApiService.resetPassword(request).subscribe({
				next: (response) => {
					this._validResponseAndRedirect(response);
				},
				error: () => (this.disabledButton = false)
			});
		}
	}

	private _validResponseAndRedirect(response: IResponse<string>): void {
		if (response.success) {
			this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
		} else if (response.errorMessage) {
			this.disabledButton = false;
		}
	}

	private _captureData(): void {
		// capturamos los datos enviados por la opción "state"
		const navigation = this._router.getCurrentNavigation();

		if (navigation?.extras && navigation.extras.state) {
			this._token = navigation.extras.state['token'] as string;
		}

		// capturamos los datos enviados por PATH PARAM
		if (this._activatedRoute.snapshot.params['email']) {
			this._email = this._activatedRoute.snapshot.params['email'] as string;
		}

		// capturamos los datos enviados por QUERY PARAM
		if (this._activatedRoute.snapshot.queryParams) {
			console.log(this._activatedRoute.snapshot.queryParams);
		}

		// en caso no existiera eltoken o el email enviaremos al usuario a la pagina de "Recuperar contraseña"
		if (!this._token || !this._email) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.recoverPasswordPage.withSlash);
		}
	}

	get passwordField() {
		return this.formGroup.controls.password;
	}
}
