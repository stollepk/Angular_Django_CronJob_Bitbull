import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { CurrentDistributionChartsComponent } from './current_distribution/current_distribution_charts.component';
import { HistoricalPositionChartsComponent } from './historical_position/historical_position_charts.component';
import { PercentageChangeChartsComponent } from './percentage_change/percentage_change_charts.component';
import { TotalValueChartsComponent } from './total_value/total_value_charts.component';

const routes: Routes = [{
    path: '',
    component: ChartsComponent,
    children: [{
        path: 'current_distribution',
        component: CurrentDistributionChartsComponent,
    },
    {
        path: 'historical_position',
        component: HistoricalPositionChartsComponent,
    },
    {
        path: 'percentage_change',
        component: PercentageChangeChartsComponent,
    },
    {
        path: 'total_value',
        component: TotalValueChartsComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
    ChartsComponent,
    CurrentDistributionChartsComponent,
    HistoricalPositionChartsComponent,
    PercentageChangeChartsComponent,
    TotalValueChartsComponent,
];
