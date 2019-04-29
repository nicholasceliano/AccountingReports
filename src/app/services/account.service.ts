import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { APIResponse } from '../models/apiresponse';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) { }

	GetAccountData(): Observable<APIResponse<Account[]>> {
		return this.http.get<APIResponse<Account[]>>(`${environment.apiEndpoint}/account`);
	}
}
