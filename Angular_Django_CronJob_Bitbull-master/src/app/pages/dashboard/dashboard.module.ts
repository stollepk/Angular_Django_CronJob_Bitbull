import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { BitBullDataOptionComponent } from './bitbull_data_option/bitbull_data_option.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';

@NgModule({
    imports: [
        ThemeModule,
        AngularEchartsModule,
    ],
    declarations: [
        DashboardComponent,
        BitBullDataOptionComponent,
        ElectricityComponent,
        ElectricityChartComponent,
    ],
})
export class DashboardModule { }
