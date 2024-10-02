import React, { useState } from "react";
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

    const { loginPatient } = PatientApi();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError(true)
        }
        else {
            loginPatient({ mobile })
                .then(data => {
                    if (data.data.isLoggedIn !== true) {
                        alert(data.data.otp)
                        setIsError(false)
                    }
                    else {
                        setIsError(true)
                    }
                    setPatientId(data.data._id)
                    let item = data.data
                    setLoginData(item)
                    setShowOTP(true)
                })
        }
    }

    return (
            <div className="full-width ">
                <form >
                    <div className="clearfix">
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

                            {showOTP === true && isError !== true ?
                                <>
                                    <LoginPatientOtp loginData={loginData} />
                                    <Outlet />
                                </>
                                : <div className="mr-3 " align='left'>
                                    <MainButtonInput onClick={handleSubmit}>Go</MainButtonInput>
                                </div>
                            }
                            {isError === true ?
                                <span className="validation mb-2 ml-3">
                                    Please Enter Valid Mobile Number
                                </span>
                                : null
                            }
                        </div>
                    </div>
                </form>
            </div>

    )
}