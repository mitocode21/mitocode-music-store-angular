import { Component } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ContainerModule } from './commons/components/container/container.module';

@Component({
	standalone: true,
	selector: 'app-root',
	template: `<app-container />
		<ngx-ui-loader
			fgsColor="#e91e63"
			fgsType="rectangle-bounce-pulse-out"
			[fgsSize]="80"
			pbColor="#e91e63"
		></ngx-ui-loader> `,
	imports: [ContainerModule, NgxUiLoaderModule]
})
export class AppStandaloneComponent {}
