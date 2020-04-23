import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DataService } from '../../../@core/data/data.service';

@Component({
    selector: 'ngx-echarts-current-distribution-pie',
    template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class CurrentDistributionPieComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;

    chartdata: any = {};

    constructor(private theme: NbThemeService,
        private DataService: DataService) {
    }

    ngOnInit() {

        this.DataService.getCurrentDistributionPieChartData()
            .subscribe((data: any) => {
                this.chartdata = data;
            });
    }

    ngAfterViewInit() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : ${c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.chartdata[1],
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                series: [
                    {
                        name: 'Balance',
                        type: 'pie',
                        radius: '80%',
                        center: ['50%', '50%'],
                        data: this.chartdata[0],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: echarts.itemHoverShadowColor,
                            },
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: echarts.textColor,
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: echarts.axisLineColor,
                                },
                            },
                        },
                    },
                ],
            };
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
