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
    const { validLoginPatient } = PatientApi();
    const [showOTP, setShowOTP] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError(true)
        }
        else {
            validLoginPatient({ mobile })
                .then(response => {
                    if (response.data.isLoggedIn === true) {
                        alert(response.data.otp)
                        setIsError(false)
                    }
                    else {
                        setIsError(true)
                    }
                    let item = response.data
                    setLoginData(item)
                    setShowOTP(true)
                })
        }
    };

    return (
        <div >
            <label className='mb-2'>Mobile Number</label>
            <div className="">
                <MainInput
                    name="mobile"
                    value={mobile.mobile}
                    type="text"
                    maxLength={10}
                    minLength={10}
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Phone Number (+XX)" >
                </MainInput>
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
            {isError === true ?
                <div className="validation">
                    Please enter valid mobile number.
                </div>
                : null
            }
        </div>
    )
}