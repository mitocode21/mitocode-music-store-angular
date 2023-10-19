import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';

@Component({
	standalone: true,
	selector: 'app-maintenance',
	templateUrl: './maintenance.component.html',
	styleUrls: ['./maintenance.component.scss'],
	imports: [CardMenusComponent, RouterOutlet]
})
export class MaintenanceComponent {}
