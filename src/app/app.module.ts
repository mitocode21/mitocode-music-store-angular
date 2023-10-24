import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule } from './commons/components/container/container.module';
import { DemoService } from './demo.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ContainerModule, HttpClientModule],
	providers: [DemoService],
	bootstrap: [AppComponent]
})
export class AppModule {}
