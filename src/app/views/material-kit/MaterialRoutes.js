import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import Transactions from '../recharge/Transactions'
import WalletRequestListingTable2 from '../wallet/WalletRequestListingTable2'
const BankAccountTable = Loadable(
    lazy(() => import('../bank/bankAccount/BankAccountTable'))
)
const UserListingTable = Loadable(
    lazy(() => import('../user/UserListingTable'))
)
const WalletRequestListingTable = Loadable(
    lazy(() => import('../wallet/WalletRequestListingTable'))
)
const BannerListTable = Loadable(lazy(() => import('./tables/BannerListTable')))
const TickerListTable = Loadable(lazy(() => import('./tables/TickerListTable')))
const CompanyListing = Loadable(
    lazy(() => import('../api-settings/company-listing/OperatorListing'))
)
const ApiListing = Loadable(
    lazy(() => import('../api-settings/apis/ApiListing'))
)
const BankListTable = Loadable(lazy(() => import('../bank/BankListTable')))
const AddUpdateCompany = Loadable(
    lazy(() => import('../api-settings/company-listing/AddUpdateCompany'))
)
const AmbikaSlabList = Loadable(
    lazy(() => import('../api-settings/company-listing/AmbikaSlabList'))
)
const ServiceList = Loadable(
    lazy(() => import('../api-settings/services-listing/ServiceList'))
)
const OperatorSwitching = Loadable(
    lazy(() => import('../api-settings/operator-switching/OperatorSwitching'))
)
const AddUpdateService = Loadable(
    lazy(() => import('../api-settings/services-listing/AddUpdateService'))
)
const AddUpdateApis = Loadable(
    lazy(() => import('../api-settings/apis/AddUpdateApis'))
)
const DiscountOnRecharge = Loadable(
    lazy(() => import('../recharge/discount/DiscountOnRecharge'))
)
const RechargeList = Loadable(lazy(() => import('../recharge/RechargeList')))
const StateList = Loadable(lazy(() => import('../utilities/StateList')))
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
        path: '/bank/list',
        element: <BankListTable />,
    },
    {
        path: '/bank/account',
        element: <BankAccountTable />,
    },
    {
        path: '/banner/list',
        element: <BannerListTable />,
    },
    {
        path: '/ticker/list',
        element: <TickerListTable />,
    },
    {
        path: '/user/wallet-request',
        // element: <WalletRequestListingTable />,
        element: <WalletRequestListingTable2 />,
    },
    {
        path: '/user/list',
        element: <UserListingTable />,
    },
    {
        path: '/api-setting/api',
        element: <ApiListing />,
    },
    {
        path: '/api-setting/api/add',
        element: <AddUpdateApis />,
    },
    {
        path: '/api-setting/api/add/:id',
        element: <AddUpdateApis />,
    },
    {
        path: '/api-setting/company',
        element: <CompanyListing />,
    },
    {
        path: '/api-setting/operator',
        element: <OperatorSwitching />,
    },
    {
        path: '/api-setting/company/add',
        element: <AddUpdateCompany />,
    },
    {
        path: '/api-setting/company/add/:id',
        element: <AddUpdateCompany />,
    },
    {
        path: '/api-setting/ambika-slabs',
        element: <AmbikaSlabList />,
    },
    {
        path: '/api-setting/service',
        element: <ServiceList />,
    },
    {
        path: '/api-setting/service/add',
        element: <AddUpdateService />,
    },
    {
        path: '/api-setting/service/add/:id',
        element: <AddUpdateService />,
    },
    {
        path: '/recharge/discount',
        element: <DiscountOnRecharge />,
    },
    {
        path: '/recharge/transactions',
        element: <Transactions />,
    },
    {
        path: '/recharge',
        element: <RechargeList />,
    },
    {
        path: '/utility/state',
        element: <StateList />,
    },
]

export default materialRoutes
