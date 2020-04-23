import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';

import { CurrentDistributionPieComponent } from './current_distribution/current_distribution_pie.component';
import { CurrentDistributionBarComponent } from './current_distribution/current_distribution_bar.component';
import { HistoricalPositionComponent } from './historical_position/historical_position.component';
import { PercentageChangeComponent } from './percentage_change/percentage_change.component';
import { TotalValueComponent } from './total_value/total_value.component';

const components = [
	CurrentDistributionPieComponent,
	CurrentDistributionBarComponent,
	HistoricalPositionComponent,
	PercentageChangeComponent,
	TotalValueComponent,
];

@NgModule({
	imports: [ThemeModule, ChartsRoutingModule, AngularEchartsModule,],
	declarations: [...routedComponents, ...components],
})
export class ChartsModule { }
