import { combineReducers } from "redux"
import ScrumBoardReducer from "./ScrumBoardReducer"
import NotificationReducer from "./NotificationReducer"
import EcommerceReducer from "./EcommerceReducer"
import NavigationReducer from "./NavigationReducer"
import apisReducer from "app/views/api-settings/apis/store/reducer"
import servicesListReducer from "app/views/api-settings/services-listing/store/reducer"
import rechargeReducer from "app/views/recharge/store/reducer"
import utilityReducer from "app/views/utilities/store/reducer"
import walletReducer from "app/views/wallet/store/reducer"
import reportsReducer from "app/views/reports/store/reducer"
import LoginReducers from "./loginReducer"
import accountReducer from "app/views/user/store/reducer"
import operatorReducer from "app/views/api-settings/operator-list/store/reducer"
import operatorConfigReducer from "app/views/api-settings/operator-config/store/reducer"
import discountReducer from "app/views/recharge/discount/store/reducer"
import contactUsReducer from "app/views/utilities/ContactUs/store/reducer"
import paymentGateWayReducer from "app/views/api-settings/payment-gateway/store/reducer"

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  scrumboard: ScrumBoardReducer,
  ecommerce: EcommerceReducer,
  apis: apisReducer,
  paymentGateway: paymentGateWayReducer,
  servicesList: servicesListReducer,
  recharge: rechargeReducer,
  reports: reportsReducer,
  utilities: utilityReducer,
  wallet: walletReducer,
  account: accountReducer,
  operators: operatorReducer,
  user: LoginReducers,
  operatorConfig: operatorConfigReducer,
  discount: discountReducer,
  contactUs: contactUsReducer,
})

export default RootReducer
