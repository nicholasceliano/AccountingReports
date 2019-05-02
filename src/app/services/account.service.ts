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

	GetAccount(accountId: string): Observable<Account> {
		return this.GetAccountData(accountId).pipe(
			map((res) => res.data)
		);
	}

	GetAccountTree(): Observable<AccountTreeNode[]> {
		return this.GetAccountsData().pipe(
			map((res) => {
				let accountTree: AccountTreeNode[] = [];
				accountTree = this.BuildAccountTree(res.data, null, accountTree);

				this.RollupAccountValues(accountTree);

				return accountTree;
			})
		);
	}

	GetAccountTreeNode(accountId: string, accounts: AccountTreeNode[]): AccountTreeNode {
		let accountNode: AccountTreeNode;
		for (const a of accounts) {
			if (accountNode) {
				break;
			} else {
				if (a.id === accountId) {
					accountNode = a;
					break;
				} else {
					accountNode = this.GetAccountTreeNode(accountId, a.accounts);
				}
			}
		}

		return accountNode;
	}

	GetAccountTreeHeirarchy(accountId: string, accounts: AccountTreeNode[], origAccounts: AccountTreeNode[] = null): string[] {
		let treeHeirarchy: string[] = [];

		const accFilter = accounts.filter(x => x.id === accountId);

		if (accFilter.length > 0) {
			treeHeirarchy.push(accFilter[0].name);
			if (accFilter[0].parentId) {
				treeHeirarchy = treeHeirarchy.concat(this.GetAccountTreeHeirarchy(accFilter[0].parentId, origAccounts, origAccounts));
			}
		} else {
			for (const a of accounts) {
				const e = this.GetAccountTreeHeirarchy(accountId, a.accounts, origAccounts);
				if (e.length > 0) {
					treeHeirarchy = treeHeirarchy.concat(e);
					break;
				}
			}
		}

		return treeHeirarchy;
	}

	GetAccountTreeSubAccountsCt(accountId: string, accounts: AccountTreeNode[]): number {
		let subAccountsCt = 0;

		for (const a of accounts) {
			if (a.id === accountId || accountId == null) {
				subAccountsCt += a.accounts.length;
				subAccountsCt += this.GetAccountTreeSubAccountsCt(null, a.accounts);

				if (accountId) {
					break;
				}
			} else {
				subAccountsCt += this.GetAccountTreeSubAccountsCt(accountId, a.accounts);
			}
		}

		return subAccountsCt;
	}

	private GetAccountData(accountId?: string): Observable<APIResponse<Account>> {
		return this.http.get<APIResponse<Account>>(`${environment.apiEndpoint}/account/${accountId}`);
	}

	private GetAccountsData(): Observable<APIResponse<Account[]>> {
		return this.http.get<APIResponse<Account[]>>(`${environment.apiEndpoint}/account`);
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
