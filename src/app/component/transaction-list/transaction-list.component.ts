import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';
import { LoadingPanel } from 'src/app/models/interfaces/loading-panel';

@Component({
	selector: 'app-transaction-list',
	templateUrl: './transaction-list.component.html',
	styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges, LoadingPanel {

	constructor(
		private transactionService: TransactionService) { }

	public transactions: Transaction[];
	public panelLoaded = false;
	@Input() accountId: string;

	ngOnInit() {
	}

	ngOnChanges() {
		this.panelLoaded = false;
		this.transactions = [];
		this.transactionService.GetTransactionData(this.accountId).subscribe((res) => {
			this.transactions = res.data.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
			this.panelLoaded = true;
		});
	}
}
