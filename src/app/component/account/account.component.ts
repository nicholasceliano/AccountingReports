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

	ngOnInit() {
		this.route.params.subscribe(params => {
			/* tslint:disable:no-string-literal */
			this.appService.setTitle(params['type']);
			console.log(params['rootId'] + ' ' + params['type']);
			/* tslint:enable:no-string-literal */
		});
	}

}
