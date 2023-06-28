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
    name: "Discount",
    icon: "library_add",
    badge: { color: "black" },
    children: [
      {
        name: "Discount",
        path: "/recharge/discount",
        iconText: "DS",
      },
      {
        name: "Discount-new",
        path: "/recharge/discount-new",
        iconText: "DSNW",
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
    name: "User",
    icon: "account_box",
    badge: {},
    children: [
      {
        name: "user list",
        path: "/user/list",
        iconText: "UL",
      },
      {
        name: "Users",
        path: "/user/lists",
        iconText: "US",
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
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      {
        name: "Auto Complete",
        path: "/material/autocomplete",
        iconText: "A",
      },
      {
        name: "Buttons",
        path: "/material/buttons",
        iconText: "B",
      },
      {
        name: "Checkbox",
        path: "/material/checkbox",
        iconText: "C",
      },
      {
        name: "Dialog",
        path: "/material/dialog",
        iconText: "D",
      },
      {
        name: "Expansion Panel",
        path: "/material/expansion-panel",
        iconText: "E",
      },
      {
        name: "Form",
        path: "/material/form",
        iconText: "F",
      },
      {
        name: "Icons",
        path: "/material/icons",
        iconText: "I",
      },
      {
        name: "Menu",
        path: "/material/menu",
        iconText: "M",
      },
      {
        name: "Progress",
        path: "/material/progress",
        iconText: "P",
      },
      {
        name: "Radio",
        path: "/material/radio",
        iconText: "R",
      },
      {
        name: "Switch",
        path: "/material/switch",
        iconText: "S",
      },
      {
        name: "Slider",
        path: "/material/slider",
        iconText: "S",
      },
      {
        name: "Snackbar",
        path: "/material/snackbar",
        iconText: "S",
      },
      {
        name: "Table",
        path: "/material/table",
        iconText: "T",
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
