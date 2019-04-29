import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './component/app.component';
import { StockComponent } from './component/stock/stock.component';
import { AccountComponent } from './component/account/account.component';
import { APIMiddlewareInterceptor } from './interceptors/apimiddleware-interceptor';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		StockComponent,
		AccountComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		[RouterModule.forRoot(appRoutes)],
		HttpClientModule
	],
	exports: [RouterModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: APIMiddlewareInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
