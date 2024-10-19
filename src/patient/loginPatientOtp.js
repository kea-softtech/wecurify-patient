import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { MainInput } from "../mainComponent/mainInput";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";
import CreatePatientMpin from "./patientMpin/CreatePatientMpin";

function LoginPatientOtp(props) {
    const { patientId, loginData } = props;
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const [loginotp, setLoginOtp] = useState('');
    const [data, setData] = useState(false)
    const getOTP = loginData.otp
    const { patientLoginOtp } = PatientApi()
    const [errormessage, setErrormessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        patientLoginOtp({ otp: loginotp, _id: patientId })
            .then((response) => {
                setPatientData(patientId)
                if (getOTP !== loginotp) {
                    setErrormessage("Please Enter Valid OTP");
                } else {
                    setData(true)
                }
            })
    }
    return (
        <>
            <div>
                {getOTP === loginotp && data === true ? <CreatePatientMpin loginData={loginData} /> :
                    <>
                        <div className="width_35">
                            <MainInput
                                type="text"
                                name="otp"
                                maxLength={6}
                                onChange={(e) => setLoginOtp(e.target.value)}
                                placeholder="6 digit OTP" >
                            </MainInput>
                            {errormessage && (<span className="validation">{errormessage}</span>)}
                        </div>
                        <div className="width_20 ml-2">
                            <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
                        </div>
                    </>
                }
            </div>
            <Outlet />
        </>
    )

}
export { LoginPatientOtp }