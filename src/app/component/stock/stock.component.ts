import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { LineGraphService } from 'src/app/servies/d3/line-graph.service';
import { LineGraphData } from 'src/app/models/d3/line-graph-data';
import { Stock } from 'src/app/models/stock';

@Component({
	selector: 'app-stock',
	templateUrl: './stock.component.html',
	styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {

	constructor(private stockService: StockService) { }

	ngOnInit() {
		this.stockService.GetStockData().subscribe((res) => {
			this.loadLineGraphs(res.data);
		});
	}

	private loadLineGraphs(data: Stock[]) {
		const accountData = {};

		data.forEach((d) => {
			d.priceDt = LineGraphService.parseDate(d.priceDt.toString());
			d.stockValue = +(d.price * d.ct);

			if (accountData[d.id] === undefined) {
				const accountDataObj = data.filter(obj => obj.id === d.id);

				accountData[d.id] = {
					id: d.id,
					title: d.name,
					initialQtyCt: accountDataObj[accountDataObj.length - 1].ct,
					data: []
				} as LineGraphData;
			}

			d.price = d.price * accountData[d.id].initialQtyCt;

			accountData[d.id].data.push(d);
		});

		for (const acc in accountData) {
			if (accountData[acc] != null) {
				new LineGraphService(900, 500).create(accountData[acc], [['priceDt', 'stockValue'], ['priceDt', 'price']]);
			}
		}
	}

}
