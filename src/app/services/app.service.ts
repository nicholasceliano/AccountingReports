import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private title = new BehaviorSubject<string>('...');
	private accountSubAccountCt = new BehaviorSubject<number>(0);
	private accountHierarchy = new BehaviorSubject<string[]>([]);
	private accountSubAccountCtObs = this.accountSubAccountCt.asObservable();
	private accountHierarchyObs = this.accountHierarchy.asObservable();
	private titleObs = this.title.asObservable();

	constructor() { }

	setTitle(title: string) {
		this.title.next(title);
	}

	getTitle(): Observable<string> {
		return this.titleObs;
	}

	setAccountSubAccountsCt(subAccountCt: number) {
		this.accountSubAccountCt.next(subAccountCt);
	}

	getAccountSubAccountsCt(): Observable<number> {
		return this.accountSubAccountCtObs;
	}

	setAccountHierarchy(accountHierarchy: string[]) {
		this.accountHierarchy.next(accountHierarchy);
	}

	getAccountHierarchy(): Observable<string[]> {
		return this.accountHierarchyObs;
	}
}
