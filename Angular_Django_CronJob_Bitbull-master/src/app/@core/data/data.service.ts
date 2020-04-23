import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/observable/of';

let counter = 0;

@Injectable()
export class DataService {

    data: any = {};

    apiRoot: string = '/api/retrieve_data/5_m/LANDON';

    constructor(private http: Http) {
        this.getData();
    }

    getData() {
        // let headers = new Headers();

        // headers.append('Authorization', 'Token 9b1090bf2f10d7c35fcff1ca4edf08b627cc4b2f');

        // let opts = new RequestOptions();

        // opts.headers = headers;

        // return this.http.get(this.apiRoot, opts)
        return this.http.get(this.apiRoot)

            .map((response: Response) => response.json())

            .subscribe(result => this.data = result);
    }

    getCurrentDistributionBarChartData(): Observable<any> {

        let CurrentDistributionBarChartValueData: Array<any> = [];
        let CurrentDistributionBarChartCategoryData: Array<any> = [];

        if (this.data.length != undefined) {
            this.data.forEach(element => {
                if (element.id == 0 && element.usd_balance != 0) {
                    CurrentDistributionBarChartValueData.push(element.usd_balance);
                    CurrentDistributionBarChartCategoryData.push(element.balance_curr_code);
                }
            });
        }
        return Observable.of([CurrentDistributionBarChartValueData,
            CurrentDistributionBarChartCategoryData]);
    }

    getCurrentDistributionPieChartData(): Observable<any> {

        let CurrentDistributionPieChartValueData: Array<any> = [];
        let CurrentDistributionPieChartCategoryData: Array<any> = [];

        if (this.data.length != undefined) {
            this.data.forEach(element => {
                if (element.id == 0 && element.usd_balance != 0) {
                    CurrentDistributionPieChartValueData.push(
                        {
                            name: element.balance_curr_code,
                            value: element.usd_balance,
                        }
                    );
                    CurrentDistributionPieChartCategoryData.push(element.balance_curr_code);
                }
            });
        }
        return Observable.of([CurrentDistributionPieChartValueData,
            CurrentDistributionPieChartCategoryData]);
    }

    getHistoricalPositionChartData(): Observable<any> {
        let HistoricalPositionChartValueData: Array<any> = [];
        let HistoricalPositionChartCategoryData: Array<any> = [];
        let HistoricalPositionChartLegendData: Array<any> = [];

        if (this.data.length != undefined) {
            this.data.forEach(element => {
                if (element.id == 0) {
                    HistoricalPositionChartLegendData.push(element.balance_curr_code);
                }
                let id = element.id;
                if (HistoricalPositionChartCategoryData[id] == undefined) {
                    HistoricalPositionChartCategoryData.push(new Date(element.time).toLocaleString());
                }
            });
            HistoricalPositionChartLegendData.forEach(name => {
                let values: Array<any> = [];
                this.data.forEach(element => {
                    if (name == element.balance_curr_code) {
                        values.push(element.usd_balance);
                    }
                })
                HistoricalPositionChartValueData.push({
                    name: name,
                    type: 'line',
                    data: values,
                });
            })
        }
        return Observable.of([HistoricalPositionChartValueData,
            HistoricalPositionChartCategoryData, HistoricalPositionChartLegendData]);
    }

    getPercentageChangeChartData(): Observable<any> {

        let CurrentDistributionBarChartValueData: Array<any> = [];
        let CurrentDistributionBarChartCategoryData: Array<any> = [];

        if (this.data.length != undefined) {
            this.data.forEach(element => {
                if (element.id == 0) {
                    let code = element.balance_curr_code;
                    this.data.forEach(idx => {
                        if (idx.id == 1 && idx.balance_curr_code == code) {
                            let pct_change = element.usd_balance / idx.usd_balance - 1;
                            CurrentDistributionBarChartValueData.push(pct_change);
                            CurrentDistributionBarChartCategoryData.push(code);
                        }
                    })
                }
            });
        }
        return Observable.of([CurrentDistributionBarChartValueData,
            CurrentDistributionBarChartCategoryData]);
    }

    getTotalValueChartData(): Observable<any> {
        let TotalValueChartValueData: Array<any> = [];
        let TotalValueChartCategoryData: Array<any> = [];

        if (this.data.length != undefined) {
            this.data.forEach(element => {
                let id = element.id;
                if (TotalValueChartCategoryData[id] == undefined) {
                    let total_value = 0;

                    this.data.forEach(idx => {
                        if (idx.id == id) {
                            total_value += parseFloat(idx.usd_balance);
                        }
                    });

                    TotalValueChartCategoryData.push(new Date(element.time).toLocaleString());
                    TotalValueChartValueData.push(total_value);

                }
            });
        }

        let TotalValueChartData: Array<any> = [];
        TotalValueChartData.push({
            name: 'Total Value',
            type: 'line',
            data: TotalValueChartValueData,
        })
        return Observable.of([TotalValueChartCategoryData, TotalValueChartData]);
    }

    getFundPositionTableData() {

        let FundPositionTableData: Array<any> = [];

        if (this.data.length != undefined) {
            this.data.forEach(element => {
                if (element.id == 0 && element.usd_balance != 0) {
                    let code = element.balance_curr_code;
                    let pct_change;
                    this.data.forEach(idx => {
                        if (idx.id == 1 && idx.balance_curr_code == code) {
                            pct_change = (element.usd_balance / idx.usd_balance) - 1;
                        }
                    });
                    FundPositionTableData.push(
                        {
                            id: element.id,
                            balance_curr_code: element.balance_curr_code,
                            usd_balance: element.usd_balance,
                            btc_balance: element.btc_balance,
                            time: new Date(element.time).toLocaleString(),
                            pct_change: pct_change,
                        }
                    );
                }
            });
            return FundPositionTableData;
        }
    }
}
