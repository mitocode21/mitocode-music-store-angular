import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './container.component';

@NgModule({
	declarations: [ContainerComponent, HeaderComponent, FooterComponent],
	imports: [RouterOutlet, RouterLink, MatButtonModule, NgIf],
	exports: [ContainerComponent]
})
export class ContainerModule {}
