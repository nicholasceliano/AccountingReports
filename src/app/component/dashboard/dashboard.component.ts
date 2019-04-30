import { Component, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AccountOverview } from '../../models/account-overview';
import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private appService: AppService) { }

	public accounts: AccountOverview[] = [];

	ngOnInit() {
		this.appService.setTitle('Dashboard');
		this.getAccountOverviewInfo();
	}

	private getAccountOverviewInfo() {
		this.accountService.GetAccountOverviewData().subscribe((res) => {
			this.accounts = res;
		});
	}

}
