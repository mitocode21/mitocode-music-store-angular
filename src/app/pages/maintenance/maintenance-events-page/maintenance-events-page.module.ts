import { NgModule } from '@angular/core';

import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomCurrencyPipe } from '../../../commons/pipes/custom-currency.pipe';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { CrudEventComponent } from './crud-event/crud-event.component';
import { EventTableComponent } from './event-table/event-table.component';

@NgModule({
	declarations: [CrudEventComponent, EventTableComponent],
	imports: [
		MatTableModule,
		MatMenuModule,
		MatPaginatorModule,
		SharedFormCompleteModule,
		NgIf,
		NgFor,
		CustomCurrencyPipe,
		DatePipe
	],
	providers: [DatePipe],
	exports: [CrudEventComponent, EventTableComponent, MatTabsModule, MatIconModule]
})
export class MaintenanceEventsModule {}
