import React, { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import PatientApi from "../../services/PatientApi";
import { ShowPatientOtp } from "./ShowPatientOtp";

export default function ForgotPatientLoginMpin(props) {
    const { patientId } = props
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId);
    const [loginData, setLoginData] = useState([])
    const [message, setMessage] = useState(false)
    const { validLoginPatient } = PatientApi();
    const [showOTP, setShowOTP] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else {
            validLoginPatient({ mobile })
                .then(response => {
                    if (response.data.isLoggedIn === true) {
                        setIsError(false)
                        setShowOTP(true)
                        setMessage(true)
                    }
                    else {
                        setIsError('Entered mobile number is not register')
                    }
                    let item = response.data
                    setLoginData(item)
                })
        }
    };

    return (
        <div >
            <label className='mb-2'>Mobile Number</label>
            <div className="mb-2">
                <input
                    name="mobile"
                    value={mobile.mobile}
                    maxLength={10}
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Phone Number (+XX)"
                    className="form-control"
                />
                {message && (<span className="sendotp-message"> OTP is sent to the mobile number</span>)}
                <div className="validation">{isError} </div>
            </div>
            {showOTP === true && isError !== true ?
                <ShowPatientOtp
                    doctorId={doctorId}
                    patientId={patientId}
                    loginData={loginData}
                    mobile={mobile}
                />
                :
                <div align='left' >
                    <MainButtonInput onClick={handleSubmit}>Go</MainButtonInput>
                </div>
            }

        </div>
    )
}