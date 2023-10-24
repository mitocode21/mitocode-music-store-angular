import { CurrencyPipe, DatePipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { CustomCurrencyPipe } from '../../commons/pipes/custom-currency.pipe';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

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
		NgSwitch
	]
})
export default class BuyPageComponent {
	currentDate = new Date();
	statusBuy: StatusBuy = 'INFO';

	clickBuy(statusBuy: StatusBuy): void {
		this.statusBuy = statusBuy;
	}
}
