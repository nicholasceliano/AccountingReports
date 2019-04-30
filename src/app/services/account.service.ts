import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { APIResponse } from '../models/apiresponse';
import { AccountOverview } from '../models/account-overview';
import { AccountRoot } from '../models/account-root';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) { }

	GetAccountData(): Observable<APIResponse<Account[]>> {
		return this.http.get<APIResponse<Account[]>>(`${environment.apiEndpoint}/account`);
	}

	GetAccountOverviewData(): Observable<AccountOverview[]> {
		return this.GetAccountData().pipe(
			map((res) => {
				const accounts: AccountOverview[] = [];
				const accountTypes = new Set(res.data.map(item => item.accountType));

				accountTypes.forEach((d) => {
					const typeRecords = res.data.filter(obj => obj.accountType === d);
					let value = 0;
					let rootParent: Account;

					typeRecords.forEach(e => {
						value += e.value;

						if (!rootParent) {
							rootParent = this.GetRootParentAccount(res.data, e);
						}
					});

					accounts.push({
						accountType: d,
						accountValue: value,
						parentId: rootParent.parentId,
						parentName: rootParent.parentName,
						parentRoot: rootParent.parentRoot,
					} as AccountOverview);
				});

				return accounts;
			})
		);
	}

	GetAccountRootData(): Observable<AccountRoot[]> {
		return this.GetAccountOverviewData().pipe(
			map((res) => {
				const roots: AccountRoot[] = [];
				const rootAccounts = new Set(res.map(item => item.parentRoot ? item.parentId : null));

				rootAccounts.forEach((d) => {
					const accountOverviewRecords = res.filter(obj => obj.parentId === d);
					let totalAccountValue = 0;

					accountOverviewRecords.forEach(e => {
						totalAccountValue += e.accountValue;
					});

					roots.push({
						id: d,
						name: accountOverviewRecords[0].parentName,
						value: totalAccountValue,
						accounts: accountOverviewRecords,
						containedAccount: this.isRootAccountContained(accountOverviewRecords),
					} as AccountRoot);
				});

				return roots;
			})
		);
	}

	private isRootAccountContained(aoRecs: AccountOverview[]) {
		return (aoRecs.length === 1 && aoRecs[0].parentName.toLowerCase().indexOf(aoRecs[0].accountType.toLowerCase()) > -1);
	}

	private GetRootParentAccount(typeRecords: Account[], acc: Account) {
		if (acc.parentRoot) {
			return acc;
		} else {
			const parentRecord = typeRecords.find(a => a.accountId === acc.parentId);
			return this.GetRootParentAccount(typeRecords, parentRecord);
		}
	}
}
