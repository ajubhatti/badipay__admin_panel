import React from "react"
import "../../assets/css/register.css"

const Register = () => {

  return (
    <div className="p-4">
      <div className="box">
        <div className="w-100">
          <h4>Register User</h4>
        </div>
        <div className="pt-3 w-100">
          <div className="row m-0">

            <div className="col-lg-6 col-mb-6 col-12 w-100 pe-0">
              <label>Name</label>
              <input type={"text"} name="name" className="form-control w-100" />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
