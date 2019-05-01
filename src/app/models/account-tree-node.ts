export class AccountTreeNode {
	public id: string;
	public name: string;
	public value: number;
	public accounts: AccountTreeNode[];
	public parentId: string;
}
