import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CardEventComponent } from '../../../commons/components/card-event/card-event.component';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { IResponseGenre } from '../services/genre/genre-api-model.interface';
import { IResponseListSales } from '../services/sale/sale-api-model.interface';
import { SaleApiService } from '../services/service-index';

@Component({
	standalone: true,
	selector: 'app-maintenance-buy-page',
	templateUrl: './maintenance-buy-page.component.html',
	styleUrls: ['./maintenance-buy-page.component.scss'],
	imports: [RouterModule, SharedFormCompleteModule, CardEventComponent, MatPaginatorModule, MatTableModule],
	providers: [DatePipe]
})
export default class MaintenanceBuyPageComponent implements OnInit, AfterViewInit {
	@ViewChild('paginator') paginator?: MatPaginator;

	displayedColumns: string[] = ['customer', 'event', 'ticketsQuantity', 'totalSale', 'saleDate', 'dateEvent'];

	private _saleApiService = inject(SaleApiService);
	private _formBuilder = inject(FormBuilder);
	private _datePipe = inject(DatePipe);

	listGenres: IResponseGenre[] = [];
	dataSource = new MatTableDataSource<IResponseListSales>();

	formGroup = this._formBuilder.group({
		genre: [0, Validators.required],
		dateInit: [new Date(), Validators.required],
		dateEnd: [new Date(), Validators.required]
	});

	ngOnInit(): void {
		this._loadBuys();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickQuery(): void {
		this._loadEvents();
	}

	clickClear(): void {
		this.formGroup.reset();
	}

	private _loadEvents(): void {
		if ((this, this.formGroup.valid)) {
			const dateStart = this._datePipe.transform(this.formGroup.controls.dateInit.value, 'yyyy-MM-dd')!;
			const dateEnd = this._datePipe.transform(this.formGroup.controls.dateEnd.value, 'yyyy-MM-dd')!;

			this._saleApiService.getListSales({ dateStart, dateEnd }).subscribe((response) => {
				if (response && response.success) {
					this.dataSource.data = response.data;
				}
			});
		}
	}

	private _loadBuys(): void {
		const dateStart = this._datePipe.transform(new Date(), 'yyyy-MM-dd')!;
		const dateEnd = this._datePipe.transform(new Date(), 'yyyy-MM-dd')!;

		this._saleApiService.getListSales({ dateStart, dateEnd }).subscribe((response) => {
			if (response && response.success) {
				this.dataSource.data = response.data;
			}
		});
	}
}
