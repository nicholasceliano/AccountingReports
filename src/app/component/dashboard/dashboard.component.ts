import { Component, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AppService } from 'src/app/services/app.service';
import { AccountTreeNode } from 'src/app/models/account-tree-node';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private appService: AppService) { }

	public accountTree: AccountTreeNode[] = [];

	ngOnInit() {
		this.appService.setTitle('Dashboard');
		this.getAccountDashboardInfo();
	}

	private getAccountDashboardInfo() {
		this.accountService.GetAccountTree().subscribe((res) => {
			this.accountTree = res;
		});
	}

}
