import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ICardMenu } from '../../models/components.interface';

@Component({
	standalone: true,
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss'],
	imports: [MatCardModule, NgFor, NgIf, NgClass, RouterLink, RouterLinkActive]
})
export class CardMenusComponent {
	@Input() menus: ICardMenu[] = [];
}
