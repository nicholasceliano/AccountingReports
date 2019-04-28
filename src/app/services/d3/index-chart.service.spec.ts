import { TestBed } from '@angular/core/testing';

import { IndexChartService } from './index-chart.service';

describe('IndexChartService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: IndexChartService = TestBed.get(IndexChartService);
		expect(service).toBeTruthy();
	});
});
