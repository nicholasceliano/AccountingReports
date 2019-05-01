import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { LoadingPanel } from 'src/app/models/interfaces/loading-panel';

@Component({
	selector: 'app-account-overview',
	templateUrl: './account-overview.component.html',
	styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit, OnChanges, LoadingPanel {

	constructor(private accountService: AccountService) { }

	public account: Account;
	public panelLoaded = false;
	@Input() accountId: string;

	ngOnInit() {
	}

	ngOnChanges() {
		this.panelLoaded = false;
		this.accountService.GetAccount(this.accountId).subscribe((res) => {
			this.account = res;
			this.panelLoaded = true;
		});
	}

}
