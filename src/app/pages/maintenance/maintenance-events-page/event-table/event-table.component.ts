import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseConcert } from '../../services/concerts/concert-api-model.interface';

@Component({
	selector: 'app-event-table',
	templateUrl: './event-table.component.html',
	styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent {
	displayedColumns: string[] = [
		'imageUrl',
		'title',
		'description',
		'dateEvent',
		'ticketsQuantity',
		'price',
		'genre',
		'status',
		'action'
	];
	dataSource = new MatTableDataSource<IResponseConcert>();

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickUpdate(idEvent: number): void {}

	clickDelete(idEvent: number): void {}

	clickFinalize(idEvent: number): void {}
}
