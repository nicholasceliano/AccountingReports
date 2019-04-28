import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { LineGraphData } from 'src/app/models/d3/line-graph-data';

@Injectable({
	providedIn: 'root'
})
export class LineGraphService {

	constructor(private graphWidth: number, private graphHeight: number) { }

	public static parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
	private margin = { top: 20, right: 20, bottom: 30, left: 50 };
	private width = this.graphWidth - this.margin.left - this.margin.right;
	private height = this.graphHeight - this.margin.top - this.margin.bottom;
	private x = d3.scaleTime().range([0, this.width]);
	private y = d3.scaleLinear().range([this.height, 0]);

	public create(lgObj: LineGraphData, lineXYSelectors: string[][]) {
		const _this = this;

		const l1 = d3.line().x((d: any) => _this.x(d[lineXYSelectors[0][0]])).y((d: any) => _this.y(d[lineXYSelectors[0][1]]));
		const l2 = d3.line().x((d: any) => _this.x(d[lineXYSelectors[1][0]])).y((d: any) => _this.y(d[lineXYSelectors[1][1]]));

		const svg = d3.select('body').append('svg')
			.attr('width', this.width + this.margin.left + this.margin.right)
			.attr('height', this.height + this.margin.top + this.margin.bottom)
			.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

		this.setAxisDataRange(lgObj, lineXYSelectors);

		this.setLine(svg, lgObj.data, 'blue', l1);
		this.setLine(svg, lgObj.data, 'red', l2);

		this.setTitle(svg, lgObj.title + ' ' + lgObj.id);

		this.setAxis(svg);
	}

	private setAxisDataRange(lgObj, lineXYSelectors: string[][]) {
		const minVal = parseInt(d3.min(lgObj.data, (d: any) => d[lineXYSelectors[0][1]]), 10);
		const minPrice = parseInt(d3.min(lgObj.data, (d: any) => d[lineXYSelectors[1][1]]), 10);
		const maxVal = parseInt(d3.max(lgObj.data, (d: any) => d[lineXYSelectors[0][1]]), 10);
		const maxPrice = parseInt(d3.max(lgObj.data, (d: any) => d[lineXYSelectors[1][1]]), 10);

		this.y.domain([(minVal < minPrice ? minVal : minPrice), maxVal > maxPrice ? maxVal : maxPrice]);
		this.x.domain(d3.extent(lgObj.data, (d: any) => d[lineXYSelectors[0][0]]) as any);
	}

	private setTitle(svg, title) {
		svg.append('text')
			.attr('x', (this.width / 2))
			.attr('y', 0 - (this.margin.top / 4))
			.style('font-size', '16px')
			.text(title);
	}

	private setLine(svg, data, lineColorClass, lineObj) {
		svg.append('path')
			.data([data])
			.attr('class', `line-graph-line ${lineColorClass}`)
			.attr('d', lineObj);
	}

	private setAxis(svg) {
		// Add the X Axis
		svg.append('g').attr('transform', 'translate(0,' + this.height + ')').call(d3.axisBottom(this.x));

		// Add the Y Axis
		svg.append('g').call(d3.axisLeft(this.y));
	}
}
