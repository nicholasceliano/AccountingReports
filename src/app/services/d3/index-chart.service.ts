import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
	providedIn: 'root'
})
export class IndexChartService {
	public static dateParse = d3.timeParse('%Y-%m-%d'); // '%Y-%m-%dT%H:%M:%S.%LZ');
	private margin = ({ top: 20, right: 40, bottom: 30, left: 40 });

	constructor(private chartWidth: number, private chartHeight: number) { }

	public async load(data: any[], xyzAxisDataSelectors: any) {
		data = await this.getTestData();

		const x = d3.scaleTime().domain(d3.extent(data, d => d.date) as any)
			.range([this.margin.left, this.chartWidth - this.margin.right]).clamp(true);

		const k = d3.nest().key(d => d[xyzAxisDataSelectors.z])
			.rollup(dataObj => (d3.max(dataObj, d => d[xyzAxisDataSelectors.y]) / d3.min(dataObj, d => d[xyzAxisDataSelectors.y])) as any)
			.entries(data).reduce((p, d) => Math.max(p, d.value), 0);

		const y = d3.scaleLog().domain([1 / k, k]).range([this.chartHeight - this.margin.bottom, this.margin.top]);
		const z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(d => d.name));

		const line = d3.line().x(d => x(d[xyzAxisDataSelectors.x])).y(d => y(d[xyzAxisDataSelectors.y]));
		const bisect = d3.bisector(d => d[xyzAxisDataSelectors.x]).left;

		const series = d3.nest().key(d => d[xyzAxisDataSelectors.z]).entries(data).map(({ key, values }) => {
			const v = values[0].value;
			return { key, values: values.map(({ date, value }) => ({ date, value: value / v })) };
		});

		const svg = d3.select('body').append('svg')
			.attr('width', this.chartWidth).attr('height', this.chartHeight)
			.style('-webkit-tap-highlight-color', 'transparent')
			.on('mousemove touchmove', moved);

		svg.append('g').attr('transform', `translate(0,${this.chartHeight - this.margin.bottom})`)
			.call(d3.axisBottom(x).ticks(this.chartWidth / 80).tickSizeOuter(0))
			.call(g => g.select('.domain').remove());

		svg.append('g').attr('transform', `translate(${this.margin.left},0)`)
			.call(d3.axisLeft(y)
				.ticks(null, tx => +tx.toFixed(6) + '×'))
			.call(g => g.selectAll('.tick line').clone()
				.attr('stroke-opacity', d => d === 1 ? null : 0.2)
				.attr('x2', this.chartWidth - this.margin.left - this.margin.right))
			.call(g => g.select('.domain').remove());

		const rule = svg.append('g')
			.append('line')
			.attr('y1', this.chartHeight)
			.attr('y2', 0)
			.attr('stroke', 'black');

		const serie = svg.append('g')
			.style('font', 'bold 10px sans-serif')
			.selectAll('g')
			.data(series)
			.join('g');

		serie.append('path').attr('fill', 'none')
			.attr('stroke-width', 1.5)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke', d => z(d.key))
			.attr('d', d => line(d.values));

		serie.append('text')
			.datum(d => ({ key: d.key, value: d.values[d.values.length - 1].value }))
			.attr('fill', 'none')
			.attr('stroke', 'white')
			.attr('stroke-width', 3)
			.attr('x', x.range()[1] + 3)
			.attr('y', d => y(d.value))
			.attr('dy', '0.35em')
			.text(d => d.key)
			.clone(true)
			.attr('fill', d => z(d.key))
			.attr('stroke', null);

		d3.transition()
			.ease(d3.easeCubicOut)
			.duration(1500)
			.tween('date', () => {
				const i = d3.interpolateDate(x.domain()[1], x.domain()[0]);
				return t => update(i(t));
			});

		function update(date) {
			date = d3.timeDay.round(date);
			rule.attr('transform', `translate(${x(date) + 0.5},0)`);
			serie.attr('transform', ({ values }) => {
				const i = bisect(values, date, 0, values.length - 1);
				return `translate(0,${y(1) - y(values[i].value / values[0].value)})`;
			});
			svg.property('value', date).dispatch('input');
		}

		function moved() {
			update(x.invert(d3.mouse(this)[0]));
			d3.event.preventDefault();
		}

		update(x.domain()[0]);
	}

	private async getTestData() {
		/* tslint:disable:no-string-literal */
		return d3.merge(await Promise.all(['AAPL', 'AMZN', 'GOOG', 'IBM', 'MSFT'].map(name =>
			d3.csv(`https://gist.githubusercontent.com/mbostock/696604b8395aa68d0e7dcd74abd21dbb/raw/` +
				`55c17dab8461cde25ca8c735543fba839b0c940b/${name}.csv`, d => {
					const date = IndexChartService.dateParse(d['Date']);
					return { name, date, value: +d['Close'] };
				}))));
		/* tslint:enable:no-string-literal */
	}
}
