import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit {

	constructor(private appService: AppService) { }

	ngOnInit() {
		this.appService.setTitle('Page Not Found');
	}

}
