import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '@nebular/auth/auth.options';
import { getDeepFromObject } from '@nebular/auth/helpers';

import { NbAuthResult, NbAuthService } from '@nebular/auth/services/auth.service';

@Component({
    selector: 'nb-login',
    templateUrl: './login.component.html',
})
export class NbLoginComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;

    constructor(protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
        protected router: Router) {

        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.provider = this.getConfigValue('forms.login.provider');
    }

    login(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();
                this.router.navigate(['pages']);
            } else {
                this.errors = result.getErrors();
            }

            // const redirect = result.getRedirect();
            // if (redirect) {
            //     setTimeout(() => {
            //         return this.router.navigateByUrl(redirect);
            //     }, this.redirectDelay);
            // }
        });
    }

    getConfigValue(key: string): any {
        return getDeepFromObject(this.config, key, null);
    }
}
