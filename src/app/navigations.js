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
      // {
      //   name: "user list",
      //   path: "/user/list",
      //   iconText: "UL",
      // },
      {
        name: "Users",
        path: "/user/lists",
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
        path: "/recharge/transactions",
        iconText: "TRNS",
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
        name: "Wallet list",
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
        name: "API list",
        path: "/api-setting/api",
        iconText: "APIL",
      },
      {
        name: "Services",
        path: "/api-setting/service",
        iconText: "SR",
      },
      {
        name: "Operator list",
        path: "/api-setting/operator-list",
        iconText: "COL",
      },
      {
        name: "Discount",
        path: "/recharge/discount",
        iconText: "DS",
      },
      {
        name: "Operator Switching New",
        path: "/api-setting/operator/priority",
        iconText: "APILP",
      },

      {
        name: "Operator config",
        path: "/api-setting/operators-configs",
        iconText: "Opcnfg",
      },
    ],
  },
  {
    name: "Utility",
    icon: "assignment",
    badge: "",
    children: [
      {
        name: "banner list",
        path: "/banner/list",
        iconText: "BL",
      },
      {
        name: "ticker list",
        path: "/ticker/list",
        iconText: "BL",
      },
      {
        name: "state",
        path: "/utility/state",
        iconText: "STT",
      },
      {
        name: "contactus",
        path: "/contact/list",
        iconText: "cntct",
      },
    ],
  },
  {
    name: "Bank",
    icon: "location_city",
    badge: false,
    children: [
      {
        name: "bank list",
        path: "/bank/list",
        iconText: "BL",
      },
      {
        name: "bank account list",
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
