import React, { lazy } from "react"
import Loadable from "app/components/Loadable/Loadable"
import CallBackList from "../recharge/CallBackList"

const OperatorConfigs = Loadable(
  lazy(() => import("../api-settings/operator-config/OperatorConfigs"))
)
const Transactions = Loadable(lazy(() => import("../recharge/Transactions")))
const CallBack = Loadable(lazy(() => import("../recharge/CallBackList")))
const RechargeComplaintList = Loadable(
  lazy(() => import("../recharge/RechargeComplaintList"))
)
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

const ApiResponseList = Loadable(
  lazy(() => import("../api-settings/apis/ApiResponses"))
)

const ApiTimeFrame = Loadable(
  lazy(() => import("../api-settings/apis/ApiTimeFrame"))
)
const BankListing = Loadable(lazy(() => import("../bank/BankList/BankListing")))
const ServiceCategoryListing = Loadable(
  lazy(() => import("../api-settings/service-category/ServiceCategoryListing"))
)

const ServiceList = Loadable(
  lazy(() => import("../api-settings/services-listing/ServiceList"))
)
const OperatorSwitchingNew = Loadable(
  lazy(() =>
    import("../api-settings/operator-switching-new/OperatorSwitchingNew")
  )
)
const DiscountOnRecharge = Loadable(
  lazy(() => import("../recharge/discount/DiscountOnRecharge"))
)
const UserRegister = Loadable(
  lazy(() => import("../../components/User/Register"))
)
const CashBackList = Loadable(lazy(() => import("../reports/CashBackList")))
const StateList = Loadable(lazy(() => import("../utilities/StateList")))
const PaymentGatewayListings = Loadable(
  lazy(() => import("../api-settings/payment-gateway/PaymentGatewayListings"))
)

const materialRoutes = [
  {
    path: "/service-category",
    element: <ServiceCategoryListing />,
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
    path: "/user-list",
    element: <UserListings />,
  },

  {
    path: "/payment-gateway-list",
    element: <PaymentGatewayListings />,
  },
  {
    path: "/api-list",
    element: <ApiListings />,
  },
  {
    path: "/api-response-list",
    element: <ApiResponseList />,
  },
  {
    path: "/api-time",
    element: <ApiTimeFrame />,
  },
  {
    path: "/operator-list",
    element: <OperatorList />,
  },
  {
    path: "/operator-priority",
    element: <OperatorSwitchingNew />,
  },
  {
    path: "/operators-configs",
    element: <OperatorConfigs />,
  },
  {
    path: "/service-list",
    element: <ServiceList />,
  },
  {
    path: "/recharge-discount-list",
    element: <DiscountOnRecharge />,
  },
  {
    path: "/callback",
    element: <CallBackList />,
  },
  {
    path: "/recharge-complaints",
    element: <RechargeComplaintList />,
  },
  {
    path: "/transactions",
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
