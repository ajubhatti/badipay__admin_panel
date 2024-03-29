import React from "react"
import { Link, useNavigate } from "react-router-dom"
import useSettings from "app/hooks/useSettings"
import { styled, useTheme, Box } from "@mui/system"
import { Span } from "../../../components/Typography"
import { MatxMenu, MatxSearchBox } from "app/components"
import NotificationBar from "../../NotificationBar/NotificationBar"
import { themeShadows } from "app/components/MatxTheme/themeColors"
import { NotificationProvider } from "app/contexts/NotificationContext"
import {
  Icon,
  IconButton,
  MenuItem,
  Avatar,
  useMediaQuery,
  Hidden,
} from "@mui/material"
import { topBarHeight } from "app/utils/constant"
import Cookies from "app/helpers/cookies"
import { IS_AUTH } from "app/redux/actions/loginActions"
import { useDispatch, useSelector } from "react-redux"

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}))

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": {
    margin: "0 8px",
  },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": {
    marginRight: "10px",
    color: theme.palette.text.primary,
  },
}))

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: {
    display: "none !important",
  },
}))

const Layout1Topbar = () => {
  const theme = useTheme()
  const { settings, updateSettings } = useSettings()
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuth } = useSelector((state) => state.user)

  console.log(isAuth)

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    })
  }

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings
    let mode
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close"
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full"
    }
    updateSidebarMode({ mode })
  }

  const logout = () => {
    Cookies.clear()
    dispatch({ type: IS_AUTH, payload: false })
    navigate("/session/signin")
  }

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

          <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox>
        </Box>
        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          {/* <ShoppingCart /> */}

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{"user.name"}</strong>
                  </Span>
                </Hidden>
                <Avatar
                  src={"https://source.unsplash.com/user/c_v_r/1900x800"}
                  sx={{ cursor: "pointer" }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem>
            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  )
}

export default React.memo(Layout1Topbar)
