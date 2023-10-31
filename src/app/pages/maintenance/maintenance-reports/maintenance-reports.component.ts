import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-maintenance-reports',
	templateUrl: './maintenance-reports.component.html',
	styleUrls: ['./maintenance-reports.component.scss'],
	imports: [SharedFormCompleteModule]
})
export default class MaintenanceReportsComponent {
	showReport = false;
	private _formBuilder = inject(FormBuilder);

	// constructor(private _formBuilder: FormBuilder) {}

	formGroup = this._formBuilder.nonNullable.group({
		dateInit: [new Date(), Validators.required],
		dateEnd: [new Date(), Validators.required]
	});

	clickClear(): void {
		this.formGroup.reset();
		this.showReport = false;
	}
}
