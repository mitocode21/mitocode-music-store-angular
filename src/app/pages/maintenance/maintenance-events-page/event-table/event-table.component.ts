import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseConcert } from '../../services/concerts/concert-api-model.interface';
import { ConcertApiService } from '../../services/service-index';
import { EventsService } from '../events.service';

@Component({
	selector: 'app-event-table',
	templateUrl: './event-table.component.html',
	styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, AfterViewInit {
	@Output() clickUpdate = new EventEmitter();
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	private readonly _concertApiService = inject(ConcertApiService);
	private readonly _eventsService = inject(EventsService);

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
	resultsLength = 0;

	ngOnInit(): void {
		this._loadConcerts();

		this._eventsService.channelCrudEvent$.subscribe(() => {
			this._loadConcerts();
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	private _loadConcerts(): void {
		this._concertApiService.getListConcerts().subscribe((response) => {
			this.dataSource.data = response.data;
			this.resultsLength = response.data.length;
		});
	}

	clickUpdateEvent(idEvent: number): void {
		this._eventsService.updateForm(idEvent).subscribe(() => this.clickUpdate.emit());
	}

	clickDelete(idEvent: number): void {
		this._eventsService.deleteEvent(idEvent).subscribe(() => {
			this._loadConcerts();
		});
	}

	clickFinalize(idEvent: number): void {
		this._eventsService.endEvent(idEvent);
	}
}
