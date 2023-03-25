import React from "react"
import { Grid, Card, Icon, IconButton, Tooltip } from "@mui/material"
import { Box, styled } from "@mui/system"
import { Small } from "app/components/Typography"

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    padding: "16px !important",
  },
}))

const ContentBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": {
    color: theme.palette.text.secondary,
  },
  "& .icon": {
    opacity: 0.6,
    fontSize: "44px",
    color: theme.palette.primary.main,
  },
}))

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontWeight: "500",
  fontSize: "14px",
  color: theme.palette.primary.main,
}))

const ReportStatCards = ({ cardData }) => {

  console.log("cardData", cardData);
  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      <Grid item xs={12} md={6} lg={3}>
        <StyledCard elevation={3}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>Receive CashBack</Small>
              <Heading>{cardData?.cashBackReceive || 0}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StyledCard elevation={3}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small sx={{ lineHeight: 1 }}>Net cashback</Small>
              <Heading>{cardData?.netCashBack || 0}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StyledCard elevation={3}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>Recharge Amount</Small>
              <Heading>{cardData?.rechargeAmount || 0}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StyledCard elevation={3}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>Referral cashback</Small>
              <Heading>{cardData?.referralCashBack || 0}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StyledCard elevation={3}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>Request Amount</Small>
              <Heading>{cardData?.requestAmount || 0}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StyledCard elevation={3}>
          <ContentBox>
            <Icon className="icon">attach_money</Icon>
            <Box ml="12px">
              <Small>User cashback</Small>
              <Heading>{cardData?.userCashBack || 0}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
    </Grid>
  )
}

export default ReportStatCards
