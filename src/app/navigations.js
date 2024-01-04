export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/default",
    icon: "dashboard",
  },
  {
    label: "PAGES",
    type: "label",
  },
  {
    name: "Session/Auth",
    icon: "security",
    children: [
      {
        name: "Sign in",
        iconText: "SI",
        path: "/session/signin",
      },
      {
        name: "Sign up",
        iconText: "SU",
        path: "/session/signup",
      },
      {
        name: "Forgot Password",
        iconText: "FP",
        path: "/session/forgot-password",
      },
      {
        name: "Error",
        iconText: "404",
        path: "/session/404",
      },
    ],
  },
  {
    label: "Components",
    type: "label",
  },
  {
    name: "User",
    icon: "account_box",
    badge: {},
    children: [
      {
        name: "Users",
        path: "/user-list",
        iconText: "US",
      },
    ],
  },
  {
    name: "Recharge",
    icon: "send",
    badge: { color: "secondary" },
    children: [
      {
        name: "Recharges",
        path: "/recharge",
        iconText: "RCH",
      },
      {
        name: "Transactions",
        path: "/transactions",
        iconText: "TRNS",
      },
      {
        name: "Recharge Complaints",
        path: "/recharge-complaints",
        iconText: "CMPLT",
      },
      {
        name: "call Back",
        path: "/callback",
        iconText: "CLBK",
      },
    ],
  },
  {
    name: "Reports",
    icon: "content_paste",
    badge: { color: "black" },
    children: [
      {
        name: "Cashback Report",
        path: "/reports/cashback",
        iconText: "CB",
      },
      {
        name: "Recharge Report",
        path: "/recharge/success",
        iconText: "RCH",
      },
      {
        name: "Wallet Report",
        path: "/wallet-request/success",
        iconText: "WL",
      },
    ],
  },
  {
    name: "Wallet",
    icon: "business_center",
    badge: { color: "black" },
    children: [
      {
        name: "Wallets",
        path: "/wallet-request",
        iconText: "WL",
      },
    ],
  },
  {
    name: "API Settings",
    icon: "build",
    badge: { color: "secondary" },
    children: [
      {
        name: "Payment Gateway",
        path: "/payment-gateway-list",
        iconText: "PGL",
      },
      {
        name: "APIs",
        path: "/api-list",
        iconText: "APIL",
      },
      { name: "API Config", path: "/api-config", iconText: "APICNFG" },
      { name: "API Call time", path: "/api-time", iconText: "TM" },
      { name: "Service Category", path: "/service-category", iconText: "SC" },
      {
        name: "Services",
        path: "/service-list",
        iconText: "SR",
      },
      {
        name: "Operators",
        path: "/operator-list",
        iconText: "COL",
      },
      {
        name: "Discounts",
        path: "/recharge-discount-list",
        iconText: "DS",
      },
      {
        name: "Operator Priority",
        path: "/operator-priority",
        iconText: "APILP",
      },

      {
        name: "Operator configs",
        path: "/operators-configs",
        iconText: "Opcnfg",
      },
      {
        name: "API Response",
        path: "/api-response-list",
        iconText: "APRIL",
      },
    ],
  },
  {
    name: "Utility",
    icon: "assignment",
    badge: "",
    children: [
      {
        name: "Bannerss",
        path: "/banner/list",
        iconText: "BL",
      },
      {
        name: "Tickers",
        path: "/ticker/list",
        iconText: "BL",
      },
      {
        name: "States",
        path: "/utility/state",
        iconText: "STT",
      },
      {
        name: "Contact Us",
        path: "/contact/list",
        iconText: "cntct",
      },
    ],
  },
  {
    name: "Banks",
    icon: "location_city",
    badge: false,
    children: [
      {
        name: "Banks",
        path: "/bank/list",
        iconText: "BL",
      },
      {
        name: "Bank Accounts",
        path: "/bank/account",
        iconText: "BAL",
      },
    ],
  },
  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "http://demos.ui-lib.com/matx-react-doc/",
  },
]
