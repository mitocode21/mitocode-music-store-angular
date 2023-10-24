import { Component, inject } from '@angular/core';
import { ContainerModule } from './commons/components/container/container.module';
import { DemoService } from './demo.service';

@Component({
	standalone: true,
	selector: 'app-root',
	template: '<app-container />',
	imports: [ContainerModule],
	providers: [DemoService]
})
export class AppStandaloneComponent {
	private demoService = inject(DemoService);
}
