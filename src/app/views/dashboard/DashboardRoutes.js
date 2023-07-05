import React, { lazy } from "react"
import Loadable from "app/components/Loadable/Loadable"

const UserListings = Loadable(lazy(() => import("../user/UserListings")))

const dashboardRoutes = [
  {
    path: "/dashboard/default",
    element: <UserListings />,
  },
]

export default dashboardRoutes
