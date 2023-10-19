import { Component } from '@angular/core';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [SharedFormCompleteModule, CardEventComponent]
})
export class HomePageComponent {}
