import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
	standalone: true,
	selector: 'app-card-event',
	templateUrl: './card-event.component.html',
	styleUrls: ['./card-event.component.scss'],
	imports: [MatCardModule]
})
export class CardEventComponent {}
