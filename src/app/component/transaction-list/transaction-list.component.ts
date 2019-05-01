import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
	selector: 'app-transaction-list',
	templateUrl: './transaction-list.component.html',
	styleUrls: ['./transaction-list.component.sass']
})
export class TransactionListComponent implements OnInit, OnChanges {

	constructor(
		private transactionService: TransactionService) { }

	public transactions: Transaction[];
	@Input() accountId: string;

	ngOnInit() {
	}

	ngOnChanges() {
		this.transactions = [];
		this.transactionService.GetTransactionData(this.accountId).subscribe((res) => {
			this.transactions = res.data;
		});
	}
}
