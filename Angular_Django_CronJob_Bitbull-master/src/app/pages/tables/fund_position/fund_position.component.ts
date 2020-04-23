import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { DataService } from '../../../@core/data/data.service';

@Component({
    selector: 'ngx-smart-table',
    templateUrl: './fund_position.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class FundPositionTableComponent {

    settings = {
        actions: false,
        columns: {
            balance_curr_code: {
                title: 'Currency',
                type: 'string',
            },
            time: {
                title: 'Time',
                type: 'string',
            },
            usd_balance: {
                title: 'USD Balance',
                type: 'string',
            },
            btc_balance: {
                title: 'BTC Balance',
                type: 'string',
            },
            pct_change: {
                title: 'Percentage',
                type: 'string',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private service: DataService) {
        const data = this.service.getFundPositionTableData();
        if (data != undefined) {
            this.source.load(data);
        }
    }

    ngAfterViewInit() {
        document.getElementsByClassName('time')['0'].style.width = '280px'
    }

}
