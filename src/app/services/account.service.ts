import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) { }

	GetAccountData(): Observable<Account[]> {
		return this.http.get<Account[]>(`${environment.apiEndpoint}/account`);
	}
}
