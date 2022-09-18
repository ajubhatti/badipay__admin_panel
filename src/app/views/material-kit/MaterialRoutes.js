import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import BankListTable from './tables/BankListTable'
import BankAccountTable from './tables/BankAccountTable'
import UserListTable from './tables/UserListTable'
import UserListingTable from './tables/UserListingTable'
import WalletRequestListingTable from './tables/WalletRequestListingTable'
import BannerListTable from './tables/BannerListTable'
import TickerListTable from './tables/TickerListTable'
import CompanyListing from '../api-settings/company-listing/CompanyListing'
import ApiListing from '../api-settings/apis/ApiListing'

const AppTable = Loadable(lazy(() => import('./tables/AppTable')))
const AppForm = Loadable(lazy(() => import('./forms/AppForm')))
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')))
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')))
const AppProgress = Loadable(lazy(() => import('./AppProgress')))
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')))
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')))
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')))
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')))
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')))
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')))
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')))
const AppAutoComplete = Loadable(
    lazy(() => import('./auto-complete/AppAutoComplete'))
)
const AppExpansionPanel = Loadable(
    lazy(() => import('./expansion-panel/AppExpansionPanel'))
)

const materialRoutes = [
    {
        path: '/material/table',
        element: <AppTable />,
    },
    {
        path: '/material/form',
        element: <AppForm />,
    },
    {
        path: '/material/buttons',
        element: <AppButton />,
    },
    {
        path: '/material/icons',
        element: <AppIcon />,
    },
    {
        path: '/material/progress',
        element: <AppProgress />,
    },
    {
        path: '/material/menu',
        element: <AppMenu />,
    },
    {
        path: '/material/checkbox',
        element: <AppCheckbox />,
    },
    {
        path: '/material/switch',
        element: <AppSwitch />,
    },
    {
        path: '/material/radio',
        element: <AppRadio />,
    },
    {
        path: '/material/slider',
        element: <AppSlider />,
    },
    {
        path: '/material/autocomplete',
        element: <AppAutoComplete />,
    },
    {
        path: '/material/expansion-panel',
        element: <AppExpansionPanel />,
    },
    {
        path: '/material/dialog',
        element: <AppDialog />,
    },
    {
        path: '/material/snackbar',
        element: <AppSnackbar />,
    },

    {
        path: '/material/bank',
        element: <BankListTable />,
    },
    {
        path: '/material/bank-account',
        element: <BankAccountTable />,
    },
    {
        path: '/material/banner',
        element: <BannerListTable />,
    },
    {
        path: '/material/ticker',
        element: <TickerListTable />,
    },
    {
        path: '/material/wallet-request',
        element: <WalletRequestListingTable />,
    },
    {
        path: '/material/user',
        element: <UserListingTable />,
    },
    {
        path: '/api-setting/api',
        element: <ApiListing />,
    },
    {
        path: '/api-setting/company',
        element: <CompanyListing />,
    },
]

export default materialRoutes
