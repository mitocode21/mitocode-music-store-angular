import { Component } from '@angular/core';
import { MaintenanceEventsModule } from './maintenance-events-page.module';

@Component({
	standalone: true,
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	imports: [MaintenanceEventsModule]
})
export default class MaintenanceEventsPageComponent {}
