import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MY_ACCOUNT_PAGES } from './../../../../config/path-pages';
import { ChannelHeaderService } from './../../../../services/local/channel-header.service';
import { DataUserService } from './../../../../services/local/data-user.service';
import { SessionStorageService } from './../../../../services/local/storage/storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	private _channelService = inject(ChannelHeaderService);
	private _sessionStorageService = inject(SessionStorageService);
	private _router = inject(Router);
	private _dataUserService = inject(DataUserService);

	readonly loginPath = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly registerPath = PATHS_AUTH_PAGES.registerPage.withSlash;
	readonly myAccountPath = PATH_MY_ACCOUNT_PAGES.withSlash;

	userName = '';
	isAdmin = false;
	showUser = false;

	ngOnInit(): void {
		this._getDataUser();

		this._channelService.channelHeader$.subscribe((value) => {
			if (value) {
				this._getDataUser();
			}
			this.showUser = value;
		});
	}

	private _getDataUser(): void {
		const dataUser = this._dataUserService.getDataUser();
		if (dataUser) {
			this.showUser = true;
			this.userName = dataUser.fullName;
			this.isAdmin = dataUser.isAdmin;
		}
	}

	clickLogout(): void {
		this.showUser = false;
		this._sessionStorageService.clear();
		void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
	}
}
