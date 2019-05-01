import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './component/app.component';
import { StockComponent } from './component/stock/stock.component';
import { AccountComponent } from './component/account/account.component';
import { APIMiddlewareInterceptor } from './interceptors/apimiddleware-interceptor';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './component/structure/page-not-found/page-not-found.component';
import { TransactionListComponent } from './component/transaction-list/transaction-list.component';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'account/:id', component: AccountComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		StockComponent,
		AccountComponent,
		DashboardComponent,
		PageNotFoundComponent,
		TransactionListComponent
	],
	imports: [
		BrowserModule,
		[RouterModule.forRoot(appRoutes)],
		NgbModule,
		HttpClientModule
	],
	exports: [RouterModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: APIMiddlewareInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
