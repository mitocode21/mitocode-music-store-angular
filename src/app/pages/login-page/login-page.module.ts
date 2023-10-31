import { NgIf, UpperCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormBasicModule } from './../../commons/shared/shared-form-basic.module';
import { LoginPageComponent } from './login-page.component';

const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
	declarations: [LoginPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule, UpperCasePipe, NgIf]
})
export class LoginPageModule {}
