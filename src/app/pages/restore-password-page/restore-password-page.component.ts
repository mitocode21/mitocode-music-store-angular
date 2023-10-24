import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';

@Component({
	standalone: true,
	selector: 'app-restore-password-page',
	templateUrl: './restore-password-page.component.html',
	styleUrls: ['./restore-password-page.component.scss'],
	imports: [RouterLink, SharedFormBasicModule]
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

	private _token?: string;
	private _email?: string;

	constructor() {
		// this._captureData();
	}
	ngOnInit(): void {
		console.log('email--->', this.email);
		console.log('id--->', this.id);
		console.log('value--->', this.value);
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
}
