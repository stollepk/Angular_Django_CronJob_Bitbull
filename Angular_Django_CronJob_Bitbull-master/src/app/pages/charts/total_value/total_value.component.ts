import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DataService } from '../../../@core/data/data.service';

@Component({
    selector: 'ngx-echarts-total-value',
    template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class TotalValueComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;

    constructor(
        private theme: NbThemeService,
        private DataService: DataService) {
    }

    chartdata: any = {};

    ngOnInit() {

        this.DataService.getTotalValueChartData()
            .subscribe((data: any) => {
                this.chartdata = data;
            });
    }

    ngAfterViewInit() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: [colors.dangerLight],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: echarts.tooltipBackgroundColor,
                        },
                    },
                    textStyle: {
                        width: 500,
                    }
                },
                xAxis: [
                    {
                        name: "Time",
                        nameLocation: "middle",
                        nameTextStyle: {
                            padding: 5,
                        },
                        type: 'category',
                        data: this.chartdata[0].reverse(),
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        name: "Total USD Balance",
                                            type: 'log',
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: echarts.splitLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                series: this.chartdata[1].reverse(),
            };
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
