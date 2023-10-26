import { Component, inject } from '@angular/core';
import { PATHS_AUTH_PAGES } from '../../../../config/path-pages';
import { ChannelHeaderService } from '../../../../services/local/channel-header.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	readonly loginPath = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly registerPath = PATHS_AUTH_PAGES.registerPage.withSlash;

	private _channelHeaderService = inject(ChannelHeaderService);

	ngOnInit(): void {
		this._subscriptionHeaderChannel();
	}

	private _subscriptionHeaderChannel() {
		this._channelHeaderService.channelHeader$.subscribe((show) => {
			console.log('_subscriptionHeaderChannel--> ', show);
		});
	}
}
