import { CurrencyPipe, DatePipe, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap } from 'rxjs';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { ICardEvent } from '../../commons/models/components.interface';
import { CustomCurrencyPipe } from '../../commons/pipes/custom-currency.pipe';
import { IRequestCreateSale, IResponseSale } from '../../commons/services/api/sale/sale-api-model.interface';
import { DataUserService } from '../../commons/services/local/data-user.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';
import { SaleApiService } from '../maintenance/services/service-index';

type StatusBuy = 'INFO' | 'BUY' | 'VOUCHER';

@Component({
	standalone: true,
	selector: 'app-buy-page',
	templateUrl: './buy-page.component.html',
	styleUrls: ['./buy-page.component.scss'],
	imports: [
		SharedFormCompleteModule,
		CardEventComponent,
		CustomCurrencyPipe,
		CurrencyPipe,
		DatePipe,
		NgSwitchDefault,
		NgSwitchCase,
		NgSwitch,
		NgIf
	]
})
export default class BuyPageComponent implements OnInit {
	currentDate = new Date();
	statusBuy: StatusBuy = 'INFO';
	cardEvent?: ICardEvent;
	voucher?: IResponseSale;
	numberEntries = new FormControl<number>(0, {
		nonNullable: true,
		validators: [Validators.required, Validators.min(1)]
	});
	total = 0;

	private readonly _router = inject(Router);
	private readonly _saleApiService = inject(SaleApiService);
	private readonly _toastEvokeService = inject(ToastEvokeService);
	private readonly _dataUserService = inject(DataUserService);

	constructor() {
		this._captureData();
	}

	ngOnInit(): void {
		this.numberEntries.valueChanges.subscribe(() => {
			this.total = this.numberEntries.value * this.cardEvent!.price;
		});
	}

	clickBuy(statusBuy: StatusBuy): void {
		if (this._dataUserService.isExpiredToken()) {
			this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return;
		}

		if (statusBuy === 'VOUCHER') {
			this._saveBuy();
			return;
		}

		this.statusBuy = statusBuy;
	}

	private _saveBuy(): void {
		if (this.numberEntries.invalid) {
			this.numberEntries.markAllAsTouched();
			return;
		}

		const sendBuy: IRequestCreateSale = {
			concertId: this.cardEvent!.idEvent,
			ticketsQuantity: this.numberEntries.value
		};

		this._saleApiService
			.createSale(sendBuy)
			.pipe(
				concatMap((response) => {
					return this._saleApiService.getSale(response.data);
				})
			)
			.subscribe((voucher) => {
				this.voucher = voucher.data;
				this.statusBuy = 'VOUCHER';
				this._toastEvokeService.success('Compra', 'Su compra se ha realizado con exito, gracias.');
			});
	}

	private _captureData(): void {
		// capturamos los datos del "concierto" seleccionado enviados por la opción "state"
		const navigation = this._router.getCurrentNavigation();

		if (navigation?.extras?.state && navigation.extras.state['event']) {
			this.cardEvent = navigation.extras.state['event'] as ICardEvent;
		}

		if (!this.cardEvent) {
			void this._router.navigateByUrl('/');
		}
	}
}
