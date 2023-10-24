import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';

@Component({
	standalone: true,
	selector: 'app-recovery-password-page',
	templateUrl: './recovery-password-page.component.html',
	styleUrls: ['./recovery-password-page.component.scss'],
	imports: [RouterLink, SharedFormBasicModule]
})
export default class RecoveryPasswordPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
}
