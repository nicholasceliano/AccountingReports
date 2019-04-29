import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AccountOverview } from '../../models/account-overview';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

	constructor(private accountService: AccountService) { }

	public accounts: AccountOverview[] = [];

	ngOnInit() {
		this.getAccountOverviewInfo();
	}

	private getAccountOverviewInfo() {
		this.accountService.GetAccountData().subscribe((res) => {
			const accountTypes = new Set(res.data.map(item => item.accountType));

			accountTypes.forEach((d) => {
				const typeRecords = res.data.filter(obj => obj.accountType === d);
				let value = 0;

				typeRecords.forEach(element => {
					value += element.value;
				});

				this.accounts.push({
					accountType: d,
					accountValue: value
				} as AccountOverview);
			});
		});
	}

}
