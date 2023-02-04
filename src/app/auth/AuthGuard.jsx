import React from "react"
import useAuth from "app/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Cookie } from "@mui/icons-material"
import Cookies from "app/helpers/cookies"

const AuthGuard = ({ children }) => {
    return (
        <>
            {!!Cookies.get("token") ? (
                children
            ) : (
                <Navigate to="/session/signin" />
            )}
        </>
    )
}

export default AuthGuard
