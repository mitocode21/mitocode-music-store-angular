import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
	standalone: true,
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss'],
	imports: [MatCardModule]
})
export class CardMenusComponent {}
