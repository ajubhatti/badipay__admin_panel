import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import companyReducer from 'app/views/api-settings/company-listing/store/reducer'
import apisReducer from 'app/views/api-settings/apis/store/reducer'
import servicesListReducer from 'app/views/api-settings/services-listing/store/reducer'
import operatorSwitchReducer from 'app/views/api-settings/operator-switching/store/reducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    company: companyReducer,
    apis: apisReducer,
    servicesList: servicesListReducer,
    operator: operatorSwitchReducer,
})

export default RootReducer
