import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private appService: AppService) { }

	public accountId: string;

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.accountId = params.get('id');
			this.appService.setTitle(this.accountId);
		});
	}
}
