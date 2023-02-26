import {
    Card,
    Grid,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from "@mui/material"
import React, { useState } from "react"
import useAuth from "app/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Box, styled, useTheme } from "@mui/system"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import { Paragraph, Span } from "app/components/Typography"
import { useDispatch, useSelector } from "react-redux"
import { handleLogin } from "app/redux/actions/loginActions"

const FlexBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: "center",
}))

const ContentBox = styled(Box)(() => ({
    height: "100%",
    padding: "32px",
    position: "relative",
    background: "rgba(0, 0, 0, 0.01)",
}))

const IMG = styled("img")(() => ({
    width: "100%",
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: "#1A2038",
    minHeight: "100% !important",
    "& .card": {
        maxWidth: 800,
        borderRadius: 12,
        margin: "1rem",
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: "absolute",
    top: "6px",
    left: "25px",
}))

const JwtLogin = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        ph_number: null,
        password: "",
        remember: false,
    })

    const { loading } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const { palette } = useTheme()
    const textError = palette.error.main
    const textPrimary = palette.primary.main

    const handleFormSubmit = async (event) => {
        console.log(userInfo)
        dispatch(
            handleLogin(userInfo, (status) => {
                if (!!status) {
                    navigate("/dashboard/default")
                }
            })
        )
    }

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="https://images.pexels.com/photos/13007861/pexels-photo-13007861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: "100%" }}
                                    variant="outlined"
                                    label="ph-number"
                                    max={10}
                                    min={10}
                                    onChange={handleChange}
                                    type="number"
                                    name="ph_number"
                                    value={userInfo.ph_number}
                                    validators={["required", "isNumber"]}
                                    errorMessages={[
                                        "this field is required",
                                        "phone number is not valid",
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: "12px", width: "100%" }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
                                <FormControlLabel
                                    sx={{ mb: "12px", maxWidth: 288 }}
                                    name="agreement"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: "remember",
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={userInfo.remember}
                                        />
                                    }
                                    label="Remember me"
                                />

                                {/* {message && (
                                    <Pawragraph sx={{ color: textError }}>
                                        {message}
                                    </Pawragraph>
                                )} */}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                </FlexBox>
                                <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() =>
                                        navigate("/session/forgot-password")
                                    }
                                >
                                    Forgot password?
                                </Button>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
