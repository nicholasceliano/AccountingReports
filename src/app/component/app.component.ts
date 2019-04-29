import { Component } from '@angular/core';
import $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public appTitle = environment.appTitle;
	public pageTitle = 'Test 123';

	public toggle() {
		$('#navPanel').animate({width: 'toggle'});
	}

	public settings() {

	}
}
