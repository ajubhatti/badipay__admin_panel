import React from "react"
import "./table.css"

const ReportsCard = ({ cardData }) => {
  return (
    <div className="row mb-3">
      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card text-center">
          <div className="card-content">
            <div className="card-body p-2 m-1">
              <div className="media">
                <div className="media-body text-left">
                  <h3 className="danger">
                    {cardData?.requestAmount?.toFixed(2) || 0}
                  </h3>
                  <span>
                    <h6>Request Amount</h6>
                  </span>
                </div>
                <div className="align-self-center">
                  <i className="icon-direction danger font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card text-center">
          <div className="card-content">
            <div className="card-body p-2 m-1">
              <div className="media">
                <div className="media-body text-left">
                  <h3 className="success">
                    {cardData?.rechargeAmount?.toFixed(2) || 0}
                  </h3>
                  <span>
                    <h6>Recharge Amount</h6>
                  </span>
                </div>
                <div className="align-self-center">
                  <i className="icon-cup success font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card text-center">
          <div className="card-content">
            <div className="card-body p-2 m-1">
              <div className="media">
                <div className="media-body text-left">
                  <h3 className="primary">
                    {cardData?.cashBackReceive?.toFixed(2) || 0}
                  </h3>
                  <span>
                    <h6>Receive CashBack</h6>
                  </span>
                </div>
                <div className="align-self-center">
                  <i className="icon-book-open primary font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card text-center">
          <div className="card-content">
            <div className="card-body p-2 m-1">
              <div className="media">
                <div className="media-body text-left">
                  <h3 className="danger">
                    {cardData?.userCashBack?.toFixed(2) || 0}
                  </h3>
                  <span>
                    <h6>User Cashback</h6>
                  </span>
                </div>
                <div className="align-self-center">
                  <i className="icon-direction danger font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card text-center">
          <div className="card-content">
            <div className="card-body p-2 m-1">
              <div className="media">
                <div className="media-body text-left">
                  <h3 className="danger">
                    {cardData?.referralCashBack?.toFixed(2) || 0}
                  </h3>
                  <span>
                    <h6>Referral cashback</h6>
                  </span>
                </div>
                <div className="align-self-center">
                  <i className="icon-direction danger font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card text-center">
          <div className="card-content">
            <div className="card-body p-2 m-1">
              <div className="media">
                <div className="media-body text-left">
                  <h3 className="warning">
                    {cardData?.netCashBack?.toFixed(2) || 0}
                  </h3>
                  <span>
                    <h6>Net cashback</h6>
                  </span>
                </div>
                <div className="align-self-center">
                  <i className="icon-bubbles warning font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsCard
