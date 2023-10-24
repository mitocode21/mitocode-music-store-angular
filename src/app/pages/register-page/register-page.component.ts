import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';

@Component({
	standalone: true,
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	imports: [RouterLink, MatSelectModule, SharedFormBasicModule]
})
export default class RegisterPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
}
