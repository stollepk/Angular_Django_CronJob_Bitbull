import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from './components/auth/auth.component';
import { NbAuthBlockComponent } from './components/auth/auth-block/auth-block.component';
import { NbLoginComponent } from './components/auth/login/login.component';
import { NbLogoutComponent } from './components/auth/logout/logout.component';

import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbThemeModule,
    NbUserModule,
    NbTabsetModule,
    NbCheckboxModule,
} from '@nebular/theme';

import {
    FooterComponent,
    HeaderComponent,
    ThemeSwitcherComponent,
} from './components';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import {
    SampleLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];

const NB_MODULES = [
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSidebarModule,
    NbTabsetModule,
    NbCheckboxModule,
    NgbModule,
];

const COMPONENTS = [
    HeaderComponent,
    FooterComponent,
    ThemeSwitcherComponent,
    SampleLayoutComponent,
];

const PIPES = [
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
        {
            name: 'cosmic',
        },
        [DEFAULT_THEME, COSMIC_THEME],
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
];

@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES],
    exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES,
        NbAuthComponent,
        NbAuthBlockComponent,
        NbLoginComponent,
        NbLogoutComponent,
    ],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        };
    }
}
