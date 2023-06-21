import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "app/helpers/cookies"

const AuthGuard = ({ children }) => {
  return (
    <>{!!Cookies.get("token") ? children : <Navigate to="/session/signin" />}</>
  )
}

export default AuthGuard
