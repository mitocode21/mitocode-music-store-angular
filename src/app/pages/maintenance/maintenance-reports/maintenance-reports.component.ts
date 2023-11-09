import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { DataItem, NgxChartsModule } from '@swimlane/ngx-charts';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomCurrencyPipe } from '../../../commons/pipes/custom-currency.pipe';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { ReportsApiService } from '../services/service-index';

PdfMakeWrapper.setFonts(pdfFonts);
const pdf = new PdfMakeWrapper();

@Component({
	standalone: true,
	selector: 'app-maintenance-reports',
	templateUrl: './maintenance-reports.component.html',
	styleUrls: ['./maintenance-reports.component.scss'],
	imports: [SharedFormCompleteModule, NgxChartsModule],
	providers: [DatePipe, CustomCurrencyPipe]
})
export default class MaintenanceReportsComponent {
	showReport = false;
	private _formBuilder = inject(FormBuilder);
	private _reportsApiService = inject(ReportsApiService);
	private _datePipe = inject(DatePipe);
	private _toastEvokeService = inject(ToastEvokeService);
	private _currencyPipe = inject(CustomCurrencyPipe);

	formGroup = this._formBuilder.nonNullable.group({
		dateInit: [new Date(), Validators.required],
		dateEnd: [new Date(), Validators.required]
	});

	dataPie?: DataItem[];

	clickQuery(): void {
		if (this.formGroup.invalid) {
			this._toastEvokeService.info('Validaciones', 'Asegurese de seleccionar la fecha de inicio y la fecha de fin');
			return;
		}

		this._loadSale();
	}

	private _loadSale(): void {
		const { dateInit, dateEnd } = this.formGroup.getRawValue();
		const dateInitString = this._datePipe.transform(dateInit, 'yyyy-MM-dd')!;
		const dateEndtString = this._datePipe.transform(dateEnd, 'yyyy-MM-dd')!;

		this._reportsApiService.getDataSale(dateInitString, dateEndtString).subscribe((response) => {
			this.dataPie = response.data.map((item) => ({ name: item.concertName, value: item.total }));
		});
	}

	generatePdf(): void {
		const data = this.dataPie!.map((item) => {
			return [item.name, this._currencyPipe.transform(item.value)];
		});

		const helloWord = new Txt('Hello world!').alignment('center').color('#FFA000').italics().end;

		const table = new Table(data).widths(['*', 100]).end;

		pdf.info({ title: 'Reporte Mitocode', author: 'MitoCode' });
		pdf.add(table);
		pdf.add(helloWord);
		pdf.create().download('reporte de ventas');
	}

	clickClear(): void {
		this.formGroup.reset();
		this.showReport = false;
	}
}
