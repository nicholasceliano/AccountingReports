import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { LoadingPanel } from 'src/app/models/interfaces/loading-panel';
import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'app-account-overview',
	templateUrl: './account-overview.component.html',
	styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit, OnChanges, LoadingPanel {

	constructor(
		private accountService: AccountService,
		private appService: AppService) { }

	public account: Account;
	public subAccountCt: number;
	public accountHierarchy: string;
	public panelLoaded = false;
	@Input() accountId: string;

	ngOnInit() {
		this.appService.getAccountSubAccountsCt().subscribe(subAccountCt => this.subAccountCt = subAccountCt);
		this.appService.getAccountHierarchy().subscribe(accountHierarchy => this.accountHierarchy = accountHierarchy.reverse().join(' ➙ '));
	}

	ngOnChanges() {
		this.panelLoaded = false;
		this.accountService.GetAccount(this.accountId).subscribe((res) => {
			this.account = res;
			this.panelLoaded = true;
		});
	}

}
