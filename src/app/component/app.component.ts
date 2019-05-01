import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import $ from 'jquery';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { AccountTreeNode } from '../models/account-tree-node';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
	public appTitle = environment.appTitle;
	public pageTitle: string;
	public accountTree: AccountTreeNode[] = [];
	public isCollapsed: object = {};

	constructor(
		private accountService: AccountService,
		private route: ActivatedRoute,
		private router: Router,
		private appService: AppService,
		private myElement: ElementRef) {}

	ngOnInit() {
		this.appService.getTitle().subscribe(appTitle => this.pageTitle = appTitle);

		this.accountService.GetAccountTree().subscribe((res) => {
			this.accountTree = res;

			this.bindCollapseObjects(this.accountTree);

			if (this.router.url.indexOf('/account') > -1) {
				const accountId = this.route.firstChild.snapshot.paramMap.get('id');
				this.showSelectedRouteItem(accountId);
			}
		});
	}

	ngAfterViewChecked() {
		this.scrollToSelectedNavRoute();
	}

	public toggle() {
		$('#navPanel').animate({width: 'toggle'});
	}

	public settings() {
		alert('Not Implemented');
	}

	private scrollToSelectedNavRoute() {
		const el = this.myElement.nativeElement.querySelector('.nav-selected');
		if (el != null) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}

	private showSelectedRouteItem(accountId: string) {
		const parentId = this.isCollapsed[accountId].parentId;

		if (parentId) {
			this.isCollapsed[parentId].collapsed = false;
			this.showSelectedRouteItem(parentId);
		}
	}

	private bindCollapseObjects(array: AccountTreeNode[], parentId: string = null) {
		array.forEach(e => {
			this.bindCollapseObjects(e.accounts, e.parentId);
			this.isCollapsed[e.id] = { collapsed: true, parentId: e.parentId };
		});
	}
}
