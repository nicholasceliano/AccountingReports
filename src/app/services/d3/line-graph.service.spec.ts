import { TestBed } from '@angular/core/testing';

import { LineGraphService } from './line-graph.service';

describe('LineGraphService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: LineGraphService = TestBed.get(LineGraphService);
		expect(service).toBeTruthy();
	});
});
