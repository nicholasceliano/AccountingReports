import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockComponent } from './component/stock/stock.component';
import { AccountComponent } from './component/account/account.component';
import { APIMiddlewareInterceptor } from './interceptors/apimiddleware-interceptor';

@NgModule({
	declarations: [
		AppComponent,
		StockComponent,
		AccountComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: APIMiddlewareInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
