import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
	standalone: true,
	selector: 'app-card-event',
	templateUrl: './card-event.component.html',
	styleUrls: ['./card-event.component.scss'],
	imports: [MatCardModule, NgClass]
})
export class CardEventComponent {
	isSelect = false;

	clickEvent(): void {
		this.isSelect = true;
	}
}
