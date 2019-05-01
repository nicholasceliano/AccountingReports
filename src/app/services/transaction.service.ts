import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/apiresponse';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {

	constructor(private http: HttpClient) { }

	GetTransactionData(accountId: string): Observable<APIResponse<Transaction[]>> {
		return this.http.get<APIResponse<Transaction[]>>(`${environment.apiEndpoint}/transaction?accountId=${accountId}`);
	}
}
