/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        AppRoutingModule,

        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),

        NbAuthModule.forRoot({
            providers: {
                email: {
                    service: NbEmailPassAuthProvider,
                    config: {
                        baseEndpoint: '',
                        login: {
                            endpoint: 'api/rest-auth/login/',
                            method: 'post',
                        },
                        logout: {
                            endpoint: 'api/rest-auth/logout/',
                            method: 'post',
                        },
                    },
                },
            },
            forms: {
                login: {
                    redirectDelay: 0, // delay before redirect after a successful login, while success message is shown to the user
                    provider: 'email',  // provider id key. If you have multiple providers, or what to use your own you need to tell a component to use it here
                    rememberMe: true,   // whether to show or not the `rememberMe` checkbox
                    requestPassword: false,
                    showMessages: {     // show/not show success/error messages
                        success: true,
                        error: true,
                    },
                },
                logout: {
                    redirectDelay: 0,
                    provider: 'email',
                },
                validation: {  // fields validation rules. The validations are shared between all forms.
                    password: {
                        required: true,
                        minLength: 4,
                        maxLength: 50,
                    },
                    email: {
                        required: true,
                    },
                },
            },
        }),
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
    ],
})
export class AppModule {
}
