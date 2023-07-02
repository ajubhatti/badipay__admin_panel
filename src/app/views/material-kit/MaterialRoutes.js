import React, { lazy } from "react"
import Loadable from "app/components/Loadable/Loadable"

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

const materialRoutes = [
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
