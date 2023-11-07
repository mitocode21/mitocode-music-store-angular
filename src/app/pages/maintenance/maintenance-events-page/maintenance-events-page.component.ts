import { Component } from '@angular/core';
import { EventsService } from './events.service';
import { MaintenanceEventsModule } from './maintenance-events-page.module';

@Component({
	standalone: true,
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	imports: [MaintenanceEventsModule],
	providers: [EventsService]
})
export default class MaintenanceEventsPageComponent {
	indexTabSaveEvent = 0;
}
