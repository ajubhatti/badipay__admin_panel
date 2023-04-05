import AuthGuard from "app/auth/AuthGuard"
import NotFound from "app/views/sessions/NotFound"
import materialRoutes from "app/views/material-kit/MaterialRoutes"
import dashboardRoutes from "app/views/dashboard/DashboardRoutes"
import sessionRoutes from "app/views/sessions/SessionRoutes"
import MatxLayout from "../components/MatxLayout/MatxLayout"
import { Navigate, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { useLayoutEffect } from "react"
import { IS_AUTH } from "app/redux/actions/loginActions"
import Cookies from "app/helpers/cookies"

export const AllPages = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!!Cookies.get("token")) {
      dispatch({ type: IS_AUTH, payload: true })
    } else {
      dispatch({ type: IS_AUTH, payload: false })
    }
  }, [dispatch, navigate])

  const all_routes = [
    {
      element: (
        <AuthGuard>
          <MatxLayout />
        </AuthGuard>
      ),
      children: [...dashboardRoutes, ...materialRoutes],
    },
    ...sessionRoutes,
    {
      path: "/",
      element: <Navigate to="dashboard/default" />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]

  return all_routes
}
