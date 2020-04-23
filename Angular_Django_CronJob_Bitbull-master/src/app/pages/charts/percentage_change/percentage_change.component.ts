import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DataService } from '../../../@core/data/data.service';

@Component({
    selector: 'ngx-echarts-percentage-change',
    template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class PercentageChangeComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;

    constructor(
        private theme: NbThemeService,
        private DataService: DataService) {
    }

    chartdata: any = {};

    ngOnInit() {

        this.DataService.getPercentageChangeChartData()
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
                color: [colors.primaryLight],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        name: "Currency",
                        nameLocation: "middle",
                        nameTextStyle: {
                            padding: 5,
                        },
                        type: 'category',
                        data: this.chartdata[1],
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
                        name: "Percentage Change",
                        type: 'value',
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
                series: [
                    {
                        name: 'Percentage Change',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.chartdata[0],
                    },
                ],
            };
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
