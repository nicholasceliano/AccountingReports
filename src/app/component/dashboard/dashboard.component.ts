import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AccountTreeNode } from 'src/app/models/account-tree-node';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor(private accountService: AccountService) { }

	public accountTree: AccountTreeNode[] = [];

	ngOnInit() {
		this.getAccountDashboardInfo();
	}

	private getAccountDashboardInfo() {
		this.accountService.GetAccountTree().subscribe((res) => {
			this.accountTree = res;
		});
	}

}
