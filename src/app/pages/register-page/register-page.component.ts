import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';

@Component({
	standalone: true,
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	imports: [RouterLink, MatSelectModule, SharedFormBasicModule]
})
export default class RegisterPageComponent {}
