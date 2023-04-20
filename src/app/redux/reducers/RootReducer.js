import { combineReducers } from "redux"
import ScrumBoardReducer from "./ScrumBoardReducer"
import NotificationReducer from "./NotificationReducer"
import EcommerceReducer from "./EcommerceReducer"
import NavigationReducer from "./NavigationReducer"
import companyReducer from "app/views/api-settings/company-listing/store/reducer"
import apisReducer from "app/views/api-settings/apis/store/reducer"
import servicesListReducer from "app/views/api-settings/services-listing/store/reducer"
import operatorSwitchReducer from "app/views/api-settings/operator-switching/store/reducer"
import rechargeReducer from "app/views/recharge/store/reducer"
import utilityReducer from "app/views/utilities/store/reducer"
import walletReducer from "app/views/wallet/store/reducer"
import SPSlabReducer from "app/views/api-settings/slab-config/store/reducer"
import reportsReducer from "app/views/reports/store/reducer"
import LoginReducers from "./loginReducer"
import accountReducer from "app/views/user/store/reducer"

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  scrumboard: ScrumBoardReducer,
  ecommerce: EcommerceReducer,
  company: companyReducer,
  apis: apisReducer,
  servicesList: servicesListReducer,
  operator: operatorSwitchReducer,
  recharge: rechargeReducer,
  reports: reportsReducer,
  utilities: utilityReducer,
  wallet: walletReducer,
  SPSlab: SPSlabReducer,
  account: accountReducer,
  user: LoginReducers,
})

export default RootReducer
