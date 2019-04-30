import { AccountOverview } from '../models/account-overview';

export class AccountRoot {
	public id: string;
	public name: string;
	public value: number;
	public accounts: AccountOverview[];
	public containedAccount: boolean;
}
