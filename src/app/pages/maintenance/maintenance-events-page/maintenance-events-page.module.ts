import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { CrudEventComponent } from './crud-event/crud-event.component';
import { EventTableComponent } from './event-table/event-table.component';

@NgModule({
	declarations: [CrudEventComponent, EventTableComponent],
	imports: [MatTableModule, MatMenuModule, MatPaginatorModule, SharedFormCompleteModule],
	exports: [CrudEventComponent, EventTableComponent, MatTabsModule, MatIconModule]
})
export class MaintenanceEventsModule {}
