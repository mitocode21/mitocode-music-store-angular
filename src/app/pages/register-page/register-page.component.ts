import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { IRequestRegister } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';
import { customPasswordValidator } from '../../commons/validators/forms.validator';
import { PasswordStateMatcher, crossPasswordMatchingValidatior } from './register-custom-validators';

@Component({
	standalone: true,
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	imports: [RouterLink, MatSelectModule, SharedFormBasicModule, NgIf]
})
export default class RegisterPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	private _router = inject(Router);
	private _formBuilder = inject(FormBuilder);
	private _userApiService = inject(UserApiService);

	passwordStateMatcher = new PasswordStateMatcher();
	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group(
		{
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			typeDocument: ['1'],
			documentNumber: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [customPasswordValidator, Validators.required]],
			confirmPassword: ['', [Validators.required]],
			age: this._formBuilder.control<number | null>(null)
		},
		{ validators: crossPasswordMatchingValidatior }
	);

	clickRegister(): void {
		if (this.formGroup.valid) {
			this._userApiService.register(this._getRequest()).subscribe({
				next: (response) => {
					if (response.success) {
						this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
					} else {
						this.disabledButton = false;
					}
				},
				error: () => (this.disabledButton = false)
			});
		}
	}

	private _getRequest(): IRequestRegister {
		return {
			firstName: this.firtsField.value,
			lastName: this.lastNameField.value,
			documentType: this.typeDocumentField.value!,
			documentNumber: this.documentNumberField.value,
			email: this.emailField.value,
			password: this.passwordField.value,
			confirmPassword: this.confirmPasswordField.value,
			age: this.ageField.value ? this.ageField.value : undefined,
			role: 'Customer'
		};
	}

	//#region getter and setters
	get firtsField(): FormControl<string> {
		return this.formGroup.controls.firstName;
	}

	get lastNameField(): FormControl<string> {
		return this.formGroup.controls.lastName;
	}

	get typeDocumentField(): FormControl<string | null> {
		return this.formGroup.controls.typeDocument;
	}

	get documentNumberField(): FormControl<string> {
		return this.formGroup.controls.documentNumber;
	}

	get emailField(): FormControl<string> {
		return this.formGroup.controls.email;
	}

	get passwordField(): FormControl<string> {
		return this.formGroup.controls.password;
	}

	get confirmPasswordField(): FormControl<string> {
		return this.formGroup.controls.confirmPassword;
	}

	get ageField(): FormControl<number | null> {
		return this.formGroup.controls.age;
	}
	//#endregion
}
