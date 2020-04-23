import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'nb-home',
        link: '/pages/dashboard',
        home: true,
    },
    {
        title: 'FEATURES',
        group: true,
    },
    {
        title: 'Charts',
        icon: 'nb-bar-chart',
        children: [
            {
                title: 'Current Distribution',
                link: '/pages/charts/current_distribution',
            },
            {
                title: 'Historical Position',
                link: '/pages/charts/historical_position',
            },
            {
                title: 'Percentage Change',
                link: '/pages/charts/percentage_change',
            },
            {
                title: 'Total Value',
                link: '/pages/charts/total_value',
            },
        ],
    },
    {
        title: 'Tables',
        icon: 'nb-tables',
        children: [
            {
                title: 'Fund Position',
                link: '/pages/tables/fund_position',
            },
        ],
    },
];
