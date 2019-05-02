import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	public accountId: string;

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.accountId = params.get('id');
		});
	}
}
