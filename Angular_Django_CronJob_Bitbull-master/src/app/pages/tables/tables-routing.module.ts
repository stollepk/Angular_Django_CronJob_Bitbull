import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { FundPositionTableComponent } from './fund_position/fund_position.component';

const routes: Routes = [{
    path: '',
    component: TablesComponent,
    children: [{
        path: 'fund_position',
        component: FundPositionTableComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
    TablesComponent,
    FundPositionTableComponent,
];
