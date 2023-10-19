import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';

@Component({
	standalone: true,
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss'],
	imports: [CardMenusComponent, RouterOutlet]
})
export default class MyAccountComponent {}
