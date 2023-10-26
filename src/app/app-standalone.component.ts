import { Component } from '@angular/core';
import { ContainerModule } from './commons/components/container/container.module';

@Component({
	standalone: true,
	selector: 'app-root',
	template: '<app-container />',
	imports: [ContainerModule]
})
export class AppStandaloneComponent {}
