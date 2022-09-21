export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        label: 'PAGES',
        type: 'label',
    },
    {
        name: 'Session/Auth',
        icon: 'security',
        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
            },
        ],
    },
    {
        label: 'Components',
        type: 'label',
    },
    {
        name: 'API Setings',
        icon: 'build',
        badge: { color: 'secondary' },
        children: [
            {
                name: 'API list',
                path: '/api-setting/api',
                iconText: 'APIL',
            },
            {
                name: 'company list',
                path: '/api-setting/company',
                iconText: 'COL',
            },
            {
                name: 'Operator Switching',
                path: '/api-setting/operator',
                iconText: 'APIL',
            },

            {
                name: 'Ambika Slabs',
                path: '/api-setting/ambika-slabs',
                iconText: 'COL',
            },
            {
                name: 'Services',
                path: '/api-setting/service',
                iconText: 'SR',
            },
        ],
    },
    {
        name: 'User',
        icon: 'account_box',
        badge: {},
        children: [
            {
                name: 'user list',
                path: '/material/user',
                iconText: 'UL',
            },
            {
                name: 'Wallet list',
                path: '/material/wallet-request',
                iconText: 'WL',
            },
            {
                name: 'banner list',
                path: '/material/banner',
                iconText: 'BL',
            },
            {
                name: 'ticker list',
                path: '/material/ticker',
                iconText: 'BL',
            },
        ],
    },
    {
        name: 'Bank',
        icon: 'location_city',
        badge: false,
        children: [
            {
                name: 'bank list',
                path: '/material/bank',
                iconText: 'BL',
            },
            {
                name: 'bank account list',
                path: '/material/bank-account',
                iconText: 'BAL',
            },
        ],
    },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Charts',
        icon: 'trending_up',

        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
