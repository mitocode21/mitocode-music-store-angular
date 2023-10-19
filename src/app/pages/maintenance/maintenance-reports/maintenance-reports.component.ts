import { Component } from '@angular/core';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-maintenance-reports',
	templateUrl: './maintenance-reports.component.html',
	styleUrls: ['./maintenance-reports.component.scss'],
	imports: [SharedFormCompleteModule]
})
export default class MaintenanceReportsComponent {}
