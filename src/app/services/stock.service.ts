import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock';
import { APIResponse } from '../models/apiresponse';

@Injectable({
	providedIn: 'root'
})
export class StockService {

	constructor(private http: HttpClient) { }

	GetStockData(): Observable<APIResponse<Stock[]>> {
		return this.http.get<APIResponse<Stock[]>>(`${environment.apiEndpoint}/stock`);
	}
}
