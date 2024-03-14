export const BASE_URL = process.env.REACT_APP_LOCAL_URL
// export const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth
export const LOGIN = "/login"
export const SIGNUP = "/register"
export const FORGOT_PASSWORD = "/resetUserPassword"
export const VERIFY_RESET_PASSWORD_TOKEN = "/validateResetPasswordToken"
export const UPDATE_PASSWORD = "/updateUserPassword"
export const SYSTEM_PAGE = "/detailSystemPages"
export const LOGOUT = "/logOutUser"
export const GENERATE_USER_TEMP_TOKEN = "/generateUserTempToken"

// Invitation
export const GET_HUB_INVITED_DATA = "/getHubInvitedData"
export const ACCEPT_INVITATION = "/acceptInvitation"

// My-Account
export const GET_PROFILE_INFO = "/getUserProfileDetail"
export const UPDATE_PROFILE = "/addUpdateUserProfile"
export const GET_USER_ACTIVE_MEMBERSHIPS = "/getUserAccountMemberships"
export const UPDATE_BILLING_SHIPPING_ADDRESS_DETAIL =
  "/updateBillingShippingAddressDetail"
export const CHANGE_PASSWORD = "/changePassword"
export const GET_USER_MEMBERSHIPS_VOLUMES = "/getUserMembershipVolumes"
export const UPDATE_EMAIL_OR_USERNAME = "/updateEmailOrUsername"

// Shared Dashboard
export const CHECK_IS_USER_SHARED = "/checkIsUserShared"
export const GET_USER_SHARED_PAGES_CONTENT = "/getUserSharedPagesContent"
export const SAVE_SHARED_DASHBOARD = "/saveSharedData"
export const GET_SHARED_DASHBOARD = "/getSharedDashboard"
export const DELETE_SHARED_DASHBOARD = "/deleteSharedDashboard"

// subscription-confirmation & checkout
export const GET_CONFIRM_PRODUCT_DETAIL = "/confirmProductDetail"
export const SAVE_SUBSCRIPTION_DETAILS = "/saveUserCartDetail"
export const GET_CART_DETAILS = "/getUserCartDetail"
export const UPDATE_USER_CART_USER_ID = "/updateUserCartUserId"
export const DELETE_USER_CART = "/deleteUserCartDetail"
export const SAVE_ADDRESS_DETAILS = "/saveAddressDetail"
export const VERIFY_COUPON = "/verifyCoupon"
export const CHECKOUT_USER_SUBSCRIPTION = "/checkOutUserSubscription"
export const GET_ADDRESS_DETAILS = "/getAddressDetail"

// card
export const ADD_EDIT_CARD = "/addOrUpdateCard"
export const GET_USER_CARDS = "/listUserPaymentCard"
export const DELETE_CARD = "/deleteCard"
export const SUBSCRIPTION_CARD = "/subscriptionUpdatePaymentCard"

// General
export const GET_STATES = "/listState"
export const GET_COUNTRIES = "/listCountry"
export const GET_SITES = "/listSite"
export const LIST_ALL_APP_MENU = "/listAllApplicationMenu"
export const LIST_ALL_CATEGORIES = "/listAllVolumes"
export const SITE_VISIT = "/siteVisit"
export const GET_PAYMENT_TOKEN = "/getPaymentToken"

// My-subscription
export const GET_SUBSCRIPTIONS = "/listSubscription"
export const TRANSFER_SUBSCRIPTION = "/transferSubscription"
export const DELETE_SUBSCRIPTION_ITEM = "/deleteUserSubscriptionItem"

// View subscription
export const GET_SUBSCRIPTION_DETAIL_BY_ID = "/getUserSubscriptionDetail"
export const UPDATE_SUBSCRIPTION_STATUS = "/cancelSubscription"
export const REACTIVATE_SUBSCRIPTION = "/reactiveSubscription"
export const GET_SHIPBOB_ORDERS = "/getShipbobOrders"
export const GET_SHIPMENT_DETAILS = "/getShipmentTimeline"

// View order
export const GET_ORDER_DETAIL_BY_ID = "/getOrderDetails"
export const SEND_CHARGE_RECEIPT = "/chargeTransactionReceipt"
export const SEND_REFUND_RECEIPT = "/refundTransactionReceipt"

// View product
export const GET_PRODUCT = "/listProduct"
export const GET_PRODUCT_DETAIL_BY_ID = "/getProductDetail"

//Footer
export const GET_SYSTEM_PAGE_DETAIL_URL = "/getSystemPageDetailsByKeyword"

//drift script
export const GET_DRIFT_DATA = "/getDriftCodeBySiteId"

//check Shipping bob Token
export const CHECK_SHIPPBOB_TOKEN = "/checkShipbobToken"
export const UPDATE_SHIPBOB_USER_ADDRESS = "/updateShipbobUserAddress"

export const GET_COMPANY_BY_ID = "/company"
export const GET_APIS = "/apis"
export const GET_API_RESPONSE = "/apiResponse"
export const GET_API_CONFIG = "/apiConfig"
export const GET_OPERATOR_BY_ID = "/operator"
