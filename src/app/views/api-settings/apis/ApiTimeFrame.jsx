import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import CustomTable from "app/components/Tables/CustomTable"
import { utilityService } from "app/services/utility.services"
import { timeFrameList, timeTypeList } from "app/utils/constant"
import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"

const ApiTimeFrame = () => {
  const [timeLimit, setTimeLimit] = useState({})
  const [timeType, setTimeType] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiListData, setApiListData] = useState([])

  const columns = [
    {
      text: "Time Limit",
      dataField: "timeLimit",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.timeLimit || "-"}</div>
      ),
    },
    {
      text: "Time Type",
      dataField: "timeType",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.timeType || "-"}</div>
      ),
    },
  ]

  useEffect(() => {
    getUtility()
  }, [])

  const getUtility = async () => {
    await utilityService.getAllUtility().then(async (res) => {
      setApiListData(res.data.utility)
    })
  }
  const handleSet = async () => {
    setLoading(true)

    let payload = {
      timeLimit,
      timeType,
    }

    await utilityService.getAllUtility().then(async (res) => {
      console.log({ res }, res.data.utility[0]._id)
      if (res?.data && res.data.utility.length) {
        await utilityService
          .updateUtility(res.data.utility[0]._id, payload)
          .then((res) => {
            console.log({ res })
            if (res) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
            getUtility()
          })
      } else {
        await utilityService.addUtility(payload).then((res) => {
          console.log({ res })
          if (res) {
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        })
        getUtility()
      }
    })
    setLoading(false)
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">API TIME FRAME</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <Form className="select-operator">
                    <div className="me-2">
                      <Form.Group controlId="formGridServic">
                        <ReactSelect
                          placeHolder={"Select Time"}
                          title={"Time"}
                          handleChange={(e) => {
                            setTimeLimit(e)
                          }}
                          selectedValue={timeLimit}
                          options={timeFrameList}
                        />
                      </Form.Group>
                    </div>

                    <div className="me-2">
                      <Form.Group controlId="formGridOperator">
                        <ReactSelect
                          placeHolder={"Select Type"}
                          title={"Type"}
                          handleChange={(e) => {
                            setTimeType(e)
                          }}
                          selectedValue={timeType}
                          options={timeTypeList}
                        />
                      </Form.Group>
                    </div>

                    <Button
                      type="button"
                      className={`btn btn-primary`}
                      onClick={handleSet}
                    >
                      Set
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    keyField="_id"
                    data={apiListData}
                    columns={columns}
                    showSearch={false}
                    withPagination={false}
                    loading={loading}
                    withCard={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiTimeFrame
