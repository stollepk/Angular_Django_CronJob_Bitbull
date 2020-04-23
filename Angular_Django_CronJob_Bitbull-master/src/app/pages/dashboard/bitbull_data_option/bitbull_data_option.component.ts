import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
    selector: 'ngx-bitbull-data-option',
    styleUrls: ['./bitbull_data_option.component.scss'],
    templateUrl: './bitbull_data_option.component.html',
})
export class BitBullDataOptionComponent implements OnDestroy {

    colors: any;
    themeSubscription: any;

    constructor(private theme: NbThemeService) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.colors = config.variables;
        });
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }
}
