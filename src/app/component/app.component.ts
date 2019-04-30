import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { AccountRoot } from '../models/account-root';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public appTitle = environment.appTitle;
	public pageTitle: string;
	public accountRoots: AccountRoot[] = [];
	public isCollapsed: object = {};

	constructor(
		private accountService: AccountService,
		private route: ActivatedRoute,
		private appService: AppService) {}

	ngOnInit() {
		this.appService.getTitle().subscribe(appTitle => this.pageTitle = appTitle);

		this.accountService.GetAccountRootData().subscribe((res) => {
			this.accountRoots = res;

			this.bindCollapseObjects();
		});
	}

	public toggle() {
		$('#navPanel').animate({width: 'toggle'});
	}

	public settings() {
		alert('Not Implemented');
	}

	private bindCollapseObjects() {
		this.accountRoots.forEach(e => {
			const rootId = this.route.firstChild.snapshot.paramMap.get('rootId');
			this.isCollapsed[e.id] = rootId === e.id ? false : true;
		});
	}
}
