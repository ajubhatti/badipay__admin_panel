import "../fake-db"
import React from "react"
import { AllPages } from "./routes/routes"
import { MatxTheme } from "app/components"
import { useRoutes } from "react-router-dom"
import { AuthProvider } from "app/contexts/JWTAuthContext"
import { SettingsProvider } from "app/contexts/SettingsContext"
import { ToastContainer } from "react-toastify"
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/style.css"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const all_pages = useRoutes(AllPages())

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
        limit={3}
      />

      <SettingsProvider>
        <MatxTheme>
          {/* <AuthProvider> */}
          {all_pages}
          {/* </AuthProvider> */}
        </MatxTheme>
      </SettingsProvider>
    </>
  )
}

export default App
