import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { LoginPatientOtp } from "../loginPatientOtp";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { Wrapper } from "../../mainComponent/Wrapper";
import PatientApi from "../../services/PatientApi";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";

export default function CreatePatientLogin() {
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [showOTP, setShowOTP] = useState(false)
    const [loginData, setLoginData] = useState([])
    const [message, setMessage] = useState(false)
    const { loginPatient } = PatientApi()
    const navigate = useNavigate()
    const getOTPSection = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError('Mobile number must be 10 digits')
        }
        else {
            loginPatient({ mobile })
                .then(data => {
                    if (data.data.isLoggedIn !== true) {
                        setPatientId(data.data._id)
                        let item = data.data
                        setLoginData(item)
                        setMessage(true)
                        setShowOTP(true)
                        setIsError(false)
                    }
                    else {
                        setIsError('Mobile number is already exists')
                    }
                })
        }
    }

    const goback = () => {
        navigate(-1)
    }

    return (
        <Wrapper>
            <div className=" ">
                <div className="full-width common_box">
                    <div className="bg_color_2">
                        <div className="container margin_60_35">
                            <div id="login-2">
                                <h1>Create Account</h1>
                                <form >
                                    <div className=" clearfix">
                                        <div className="last" align="left">
                                            <label className='mb-2'>Mobile Number</label>
                                            <div className='mb-2'>
                                                <input
                                                    name="mobile"
                                                    value={mobile.mobile}
                                                    maxLength={10}
                                                    pattern="[+-]?\d+(?:[.,]\d+)?"
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    placeholder="Phone Number (+XX)"
                                                    className="form-control mb-2"
                                                />
                                                {message && (<span className="sendotp-message  mb-2"> OTP is sent to the mobile number</span>)}
                                                <div className="mb-2 validation">{isError}</div>
                                            </div>
                                            {showOTP === true && isError !== true ?
                                                <>
                                                    <LoginPatientOtp loginData={loginData} />
                                                    <Outlet />
                                                </>
                                                : <div align='left'>
                                                    <MainButtonInput onClick={getOTPSection}>Go</MainButtonInput>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </form>
                                <div align='right'>
                                    <Link onClick={goback}>
                                        Already have account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}
