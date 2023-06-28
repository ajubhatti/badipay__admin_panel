import React, { lazy } from "react"
import Loadable from "app/components/Loadable/Loadable"
import DiscountOnRechargeNew from "../recharge/discount/DiscountOnRechargeNew"

const OperatorConfigs = Loadable(
  lazy(() => import("../api-settings/operator-config/OperatorConfigs"))
)
const Transactions = Loadable(lazy(() => import("../recharge/Transactions")))
const RechargeList = Loadable(lazy(() => import("../recharge/RechargeList")))
const OperatorList = Loadable(
  lazy(() => import("../api-settings/operator-list/OperatorList"))
)

const UserListings = Loadable(lazy(() => import("../user/UserListings")))
const BannerList = Loadable(
  lazy(() => import("../utilities/Banner/BannerList"))
)
const TickerList = Loadable(
  lazy(() => import("../utilities/Ticker/TickerList"))
)
const ContactUsList = Loadable(
  lazy(() => import("../utilities/ContactUs/ContactUsList"))
)
const BankAccountTable = Loadable(
  lazy(() => import("../bank/bankAccount/BankAccountTable"))
)
const UserListingTable = Loadable(
  lazy(() => import("../user/UserListingTable"))
)
const WalletRequestListingTable = Loadable(
  lazy(() => import("../wallet/WalletRequestListingTable"))
)
const ApiListings = Loadable(
  lazy(() => import("../api-settings/apis/ApiListings"))
)
const BankListing = Loadable(lazy(() => import("../bank/BankList/BankListing")))

const ServiceList = Loadable(
  lazy(() => import("../api-settings/services-listing/ServiceList"))
)
const OperatorSwitchingNew = Loadable(
  lazy(() =>
    import("../api-settings/operator-switching-new/OperatorSwitchingNew")
  )
)
const AddUpdateService = Loadable(
  lazy(() => import("../api-settings/services-listing/AddUpdateService"))
)
const DiscountOnRecharge = Loadable(
  lazy(() => import("../recharge/discount/DiscountOnRecharge"))
)
const UserRegister = Loadable(
  lazy(() => import("../../components/User/Register"))
)
const CashBackList = Loadable(lazy(() => import("../reports/CashBackList")))
const StateList = Loadable(lazy(() => import("../utilities/StateList")))
const AppTable = Loadable(lazy(() => import("./tables/AppTable")))
const AppForm = Loadable(lazy(() => import("./forms/AppForm")))
const AppButton = Loadable(lazy(() => import("./buttons/AppButton")))
const AppIcon = Loadable(lazy(() => import("./icons/AppIcon")))
const AppProgress = Loadable(lazy(() => import("./AppProgress")))
const AppMenu = Loadable(lazy(() => import("./menu/AppMenu")))
const AppCheckbox = Loadable(lazy(() => import("./checkbox/AppCheckbox")))
const AppSwitch = Loadable(lazy(() => import("./switch/AppSwitch")))
const AppRadio = Loadable(lazy(() => import("./radio/AppRadio")))
const AppSlider = Loadable(lazy(() => import("./slider/AppSlider")))
const AppDialog = Loadable(lazy(() => import("./dialog/AppDialog")))
const AppSnackbar = Loadable(lazy(() => import("./snackbar/AppSnackbar")))
const AppAutoComplete = Loadable(
  lazy(() => import("./auto-complete/AppAutoComplete"))
)
const AppExpansionPanel = Loadable(
  lazy(() => import("./expansion-panel/AppExpansionPanel"))
)

const materialRoutes = [
  {
    path: "/material/table",
    element: <AppTable />,
  },
  {
    path: "/material/form",
    element: <AppForm />,
  },
  {
    path: "/material/buttons",
    element: <AppButton />,
  },
  {
    path: "/material/icons",
    element: <AppIcon />,
  },
  {
    path: "/material/progress",
    element: <AppProgress />,
  },
  {
    path: "/material/menu",
    element: <AppMenu />,
  },
  {
    path: "/material/checkbox",
    element: <AppCheckbox />,
  },
  {
    path: "/material/switch",
    element: <AppSwitch />,
  },
  {
    path: "/material/radio",
    element: <AppRadio />,
  },
  {
    path: "/material/slider",
    element: <AppSlider />,
  },
  {
    path: "/material/autocomplete",
    element: <AppAutoComplete />,
  },
  {
    path: "/material/expansion-panel",
    element: <AppExpansionPanel />,
  },
  {
    path: "/material/dialog",
    element: <AppDialog />,
  },
  {
    path: "/material/snackbar",
    element: <AppSnackbar />,
  },

  {
    path: "/bank/list",
    element: <BankListing />,
  },

  {
    path: "/bank/account",
    element: <BankAccountTable />,
  },
  {
    path: "/banner/list",
    element: <BannerList />,
  },
  {
    path: "/ticker/list",
    element: <TickerList />,
  },
  {
    path: "/contact/list",
    element: <ContactUsList />,
  },
  {
    path: "/wallet-request",
    element: <WalletRequestListingTable />,
  },
  {
    path: "/wallet-request/:reportType",
    element: <WalletRequestListingTable />,
  },
  {
    path: "/user/list",
    element: <UserListingTable />,
  },
  {
    path: "/user/lists",
    element: <UserListings />,
  },
  {
    path: "/api-setting/api",
    element: <ApiListings />,
  },

  {
    path: "/api-setting/operator-list",
    element: <OperatorList />,
  },
  {
    path: "/api-setting/operator/priority",
    element: <OperatorSwitchingNew />,
  },
  {
    path: "/api-setting/operators-configs",
    element: <OperatorConfigs />,
  },
  {
    path: "/api-setting/service",
    element: <ServiceList />,
  },
  {
    path: "/api-setting/service/add",
    element: <AddUpdateService />,
  },
  {
    path: "/api-setting/service/add/:id",
    element: <AddUpdateService />,
  },
  {
    path: "/recharge/discount",
    element: <DiscountOnRecharge />,
  },
  {
    path: "/recharge/discount-new",
    element: <DiscountOnRechargeNew />,
  },
  {
    path: "/recharge/transactions",
    element: <Transactions />,
  },
  {
    path: "/recharge",
    element: <RechargeList />,
  },
  {
    path: "/recharge/:reportType",
    element: <RechargeList />,
  },
  {
    path: "/utility/state",
    element: <StateList />,
  },
  {
    path: "/user/register",
    element: <UserRegister />,
  },
  {
    path: "/reports/cashback",
    element: <CashBackList />,
  },
  {
    path: "/reports/cashback/:reportType",
    element: <CashBackList />,
  },
]

export default materialRoutes
