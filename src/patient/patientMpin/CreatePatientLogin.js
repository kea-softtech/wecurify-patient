import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
    const { loginPatient } = PatientApi()

    const getOTPSection = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError(true)
        }
        else {
            loginPatient({ mobile })
                .then(data => {
                    setPatientId(data.data._id)
                    alert(data.data.otp)
                    let item = data.data
                    setLoginData(item)
                    setShowOTP(true)
                })
        }
    }

    return (
        <Wrapper>
            <div className="row ">
                <div className="full-width common_box">
                    <div className="bg_color_2">
                        <div className="container margin_60_35">
                            <div id="login-2">
                                <h1>Login to Wecurify</h1>
                                <form >
                                    <div className=" clearfix">
                                        <div className="last" align="left">
                                            <label className='mb-2'>Mobile Number</label>
                                            <MainInput
                                                name="mobile"
                                                value={mobile.mobile}
                                                type="text"
                                                maxLength={10}
                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="Phone Number (+XX)" >
                                            </MainInput>

                                            {showOTP === true ?
                                                <>
                                                    <LoginPatientOtp loginData={loginData} />
                                                    <Outlet />
                                                </>
                                                : <div align='left'>
                                                    <MainButtonInput onClick={getOTPSection}>go</MainButtonInput>
                                                </div>
                                            }
                                        </div>
                                        {isError === true ?
                                            <div className="validation mb-2 ml-3">
                                                Please enter valid mobile number.
                                            </div>
                                            : null
                                        }
                                        {/* <div className="mr-3" align='right'>
                                            <MainButtonInput onClick={getOTPSection}>Login</MainButtonInput>
                                        </div> */}
                                        <div className="mr-3 appcolor" align='right'>
                                            <Link to={`/appointments/${doctorId}`}>Already have account </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper >

    )
}
