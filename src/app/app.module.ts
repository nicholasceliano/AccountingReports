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
import { AccountOverviewComponent } from './component/account-overview/account-overview.component';
import { ReportsComponent } from './component/reports/reports.component';
import { AccountReportsComponent } from './component/account-reports/account-reports.component';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'account/:id', component: AccountComponent },
	{ path: 'reports', component: ReportsComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		StockComponent,
		AccountComponent,
		DashboardComponent,
		PageNotFoundComponent,
		TransactionListComponent,
		AccountOverviewComponent,
		ReportsComponent,
		AccountReportsComponent
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
