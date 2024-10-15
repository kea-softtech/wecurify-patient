import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import PatientApi from "../../services/PatientApi";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { LoginPatientOtp } from "../loginPatientOtp";

export default function CreatePatientLoginMpin() {
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [loginData, setLoginData] = useState([])
    const [showOTP, setShowOTP] = useState(false)
    const [message, setMessage] = useState(false)

    const { loginPatient } = PatientApi();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError("Mobile number must be 10 digits")
        }
        else {
            loginPatient({ mobile })
                .then(data => {
                    if (data.data.isLoggedIn !== true) {
                        // alert(data.data.otp)
                        setShowOTP(true)
                        setMessage(true)
                        setIsError(false)
                    }
                    else {
                        setIsError("Mobile number is already exists")
                    }
                    setPatientId(data.data._id)
                    let item = data.data
                    setLoginData(item)
                })
        }
    }

    return (
        <div className="full-width ">
            <form >
                <div className="clearfix">
                    <div className="last" align="left">
                        <div className="  mb-2">
                            <label className='mb-2'>Mobile Number</label>
                            <input
                                name="mobile"
                                value={mobile.mobile}
                                maxLength={10}
                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Phone Number (+XX)"
                                className="form-control"
                            />
                            {message && (<div className="sendotp-message mb-2"> OTP is sent to the mobile number</div>)}
                            <div className=" validation">{isError}</div>
                        </div>
                        {showOTP === true && isError !== true ?
                            <>
                                <LoginPatientOtp loginData={loginData} />
                                <Outlet />
                            </>
                            : <div className="mr-3 " align='left'>
                                <MainButtonInput onClick={handleSubmit}>Go</MainButtonInput>
                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>

    )
}