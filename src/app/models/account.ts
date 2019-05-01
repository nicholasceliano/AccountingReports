export class Account {
	accountId: string;
	accountName: string;
	accountType: string;
	currencyId: string;
	currencyType: string;
	currencyName: string;
	desc: string;
	isPlaceholder: boolean;
	isStock: boolean;
	value: number;
	date?: string;
	parentId: string;
	parentName: string;
	parentRoot: boolean;
	transCt: number;
	transCtWk: number;
	transCtMo: number;
	transCtYr: number;
	valChangeWk: number;
	valChangeMo: number;
	valChangeYr: number;
	lastPrice: number;
	lastPriceDt?: string;
}
