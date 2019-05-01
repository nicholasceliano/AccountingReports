import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { APIResponse } from '../models/apiresponse';
import { AccountTreeNode } from '../models/account-tree-node';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) { }

	GetAccountData(): Observable<APIResponse<Account[]>> {
		return this.http.get<APIResponse<Account[]>>(`${environment.apiEndpoint}/account`);
	}

	GetAccountTree(): Observable<AccountTreeNode[]> {
		return this.GetAccountData().pipe(
			map((res) => {
				let accountTree: AccountTreeNode[] = [];
				accountTree = this.BuildAccountTree(res.data, null, accountTree);

				this.RollupAccountValues(accountTree);

				return accountTree;
			})
		);
	}

	private RollupAccountValues(accounts: AccountTreeNode[]) {
		let totalValue = 0;

		accounts.forEach(e => {
			const rootValue = e.value;
			const accountValue = this.RollupAccountValues(e.accounts);
			totalValue += rootValue + accountValue;

			e.value = accountValue + rootValue;
		});

		return totalValue;
	}

	private BuildAccountTree(data: Account[], parentId: string, roots: AccountTreeNode[]) {
		const subAccounts = new Set(data.filter(item => item.parentId === parentId));

		subAccounts.forEach(e => {
			roots.push({
				id: e.accountId,
				parentId: e.parentId,
				name: e.accountName,
				value: e.value,
				accounts: this.BuildAccountTree(data, e.accountId, []),
			} as AccountTreeNode);
		});

		return roots;
	}
}
