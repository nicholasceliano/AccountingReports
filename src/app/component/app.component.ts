import { AfterViewChecked, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import $ from 'jquery';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { AccountTreeNode } from '../models/account-tree-node';
import { LoadingPanel } from '../models/interfaces/loading-panel';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, LoadingPanel {
	public appTitle = environment.appTitle;
	public pageTitle: string;
	public accountTree: AccountTreeNode[] = [];
	public isCollapsed: object = {};
	public panelLoaded = false;
	public selectedNavId: string;
	private initialLoad = true;

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

			const routeId = this.route.firstChild.snapshot.paramMap.get('id');
			this.setRouteSelection(this.router.url, routeId);

			this.panelLoaded = true;
		});
	}

	routeTo(routeValue: string[]) {
		this.setRouteSelection(routeValue[0], routeValue[1]);
		this.router.navigate(routeValue);
	}

	ngAfterViewChecked() {
		if (this.panelLoaded && this.initialLoad) {
			this.scrollToSelectedNavRoute();
			this.initialLoad = false;
		}
	}

	public toggle() {
		$('#navPanel').animate({width: 'toggle'});
	}

	public settings() {
		alert('Not Implemented');
	}

	private setRouteSelection(routerUrl: string, routeId: string) {
		if (routerUrl.indexOf('/account') > -1 && routeId) {
			this.selectedNavId = routeId;

			const selectedAccountNode = this.accountService.GetAccountTreeNode(routeId, this.accountTree);
			const subAccountCt = this.accountService.GetAccountTreeSubAccountsCt(routeId, this.accountTree);
			const accountHeirarchy = this.accountService.GetAccountTreeHeirarchy(routeId, this.accountTree, this.accountTree);

			this.pageTitle = selectedAccountNode.name;
			this.appService.setAccountSubAccountsCt(subAccountCt);
			this.appService.setAccountHierarchy(accountHeirarchy);

			this.showSelectedRouteItem(routeId);
		} else if (routerUrl === '/dashboard') {
			this.selectedNavId = 'dashboard';
			this.pageTitle = 'Dashboard';
		} else if (routerUrl === '/reports') {
			this.selectedNavId = 'reports';
			this.pageTitle = 'Reports';
		}
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
