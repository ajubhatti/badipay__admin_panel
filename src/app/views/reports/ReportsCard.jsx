import React from "react"
import "./table.css"

const ReportsCard = ({ cardData }) => {
  return (
    <div className="row mb-4">
      <div className="col-xl-2 col-sm-6 col-12">
        <div className="card fix-card-height">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="danger">
                    {cardData?.requestAmount?.toFixed(2) || 0}
                  </h3>
                  <span>Request Amount</span>
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
        <div className="card fix-card-height">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="success">
                    {cardData?.rechargeAmount?.toFixed(2) || 0}
                  </h3>
                  <span>Recharge Amount</span>
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
        <div className="card fix-card-height">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="primary">
                    {cardData?.cashBackReceive?.toFixed(2) || 0}
                  </h3>
                  <span>Receive CashBack</span>
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
        <div className="card fix-card-height">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="danger">
                    {cardData?.userCashBack?.toFixed(2) || 0}
                  </h3>
                  <span>User Cashback</span>
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
        <div className="card fix-card-height">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="danger">
                    {cardData?.referralCashBack?.toFixed(2) || 0}
                  </h3>
                  <span>Referral cashback</span>
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
        <div className="card fix-card-height">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="warning">
                    {cardData?.netCashBack?.toFixed(2) || 0}
                  </h3>
                  <span>Net cashback</span>
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
