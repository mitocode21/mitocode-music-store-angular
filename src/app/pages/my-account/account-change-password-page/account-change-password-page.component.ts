import { Component } from '@angular/core';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-account-change-password-page',
	templateUrl: './account-change-password-page.component.html',
	styleUrls: ['./account-change-password-page.component.scss'],
	imports: [SharedFormCompleteModule]
})
export class AccountChangePasswordPageComponent {}
