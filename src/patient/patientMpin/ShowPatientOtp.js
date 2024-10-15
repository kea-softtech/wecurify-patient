import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import PatientApi from "../../services/PatientApi";
import { ForgotMpin } from "./ForgotMpin";

function ShowPatientOtp(props) {
    const { loginData, patientId, doctorId } = props;
    const [loginotp, setLoginOtp] = useState('');
    const [data, setData] = useState(false)
    const getOTP = loginData.otp
    const { patientLoginOtp } = PatientApi()
    const [errormessage, setErrormessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        patientLoginOtp({ otp: loginotp, _id: patientId })
            .then((response) => {
                if (getOTP !== loginotp) {
                    setErrormessage("Please Enter Valid OTP");
                } else {
                    setData(true)
                }
            })
    }
    return (

        <>
            <div className="">
                {getOTP === loginotp && data === true ?
                    <ForgotMpin
                        doctorId={doctorId}
                        mobile={loginData.mobile}
                        loginData={loginData}
                    />
                    :
                    <>
                        <div className="width_30">
                            <MainInput
                                type="text"
                                name="otp"
                                maxLength={6}
                                onChange={(e) => setLoginOtp(e.target.value)}
                                placeholder="6 digit OTP" >
                            </MainInput>
                            {errormessage && (<span className="validation">{errormessage}</span>)}
                        </div>
                        <div className="width_20">
                            <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
                        </div>
                    </>
                }
            </div>
            <Outlet />
        </>
    )
}
export { ShowPatientOtp }