import React, { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { Wrapper } from "../../mainComponent/Wrapper";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import PatientApi from "../../services/PatientApi";
import { ShowPatientOtp } from "./ShowPatientOtp";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";

export default function ForgotPatientMpin() {
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [loginData, setLoginData] = useState([])
    const { validLoginPatient } = PatientApi();
    const [showOTP, setShowOTP] = useState(false);
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError("Mobile number must have 10 number")
        }
        else {
            validLoginPatient({ mobile })
                .then(response => {
                    if (response.data.isLoggedIn === true) {
                        setPatientId(response.data._id)
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
        <Wrapper>
            <div className=" common_box">
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            <h1>Reset Password</h1>
                            <form >
                                <div className="clearfix">
                                    <div className=" last">
                                        <label className='mb-2'>Mobile Number</label>
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
                                        {showOTP === true ?
                                            <ShowPatientOtp
                                                doctorId={doctorId}
                                                patientId={patientId}
                                                loginData={loginData}
                                                mobile={mobile}
                                            />
                                            :
                                            <>
                                                <span className="validation mb-2 ">{isError}</span>
                                                <div align='left' >
                                                    <MainButtonInput onClick={handleSubmit}>Go</MainButtonInput>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}