import React, { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { Wrapper } from "../../mainComponent/Wrapper";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import PatientApi from "../../services/PatientApi";
import { ShowPatientOtp } from "./ShowPatientOtp";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { MainSelect } from "../../mainComponent/mainSelect";
import { LoginPatientOtp } from "../loginPatientOtp";

export default function ForgotPatientMpin() {
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);
    const [loginData, setLoginData] = useState([])
    const { validLoginPatient, PatientForgetEmailMpin } = PatientApi();
    const [showOTP, setShowOTP] = useState(false);
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [message, setMessage] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

    const handleSelectData = ((e) => {
        const selectedItem = e.target.value
        setSelectedValue(selectedItem)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile) {
            if (mobile.length < 10) {
                setIsError('Mobile number must be 10 digits.')
            }
            else {
                validLoginPatient({ mobile })
                    .then(response => {
                        if (response.data.isLoggedIn === true) {
                            setPatientId(response.data._id)
                            setIsError(false)
                            setMessage(true)
                            setShowOTP(true)
                        }
                        else {
                            setIsError('Entered mobile number is not register')
                        }
                        let item = response.data
                        setLoginData(item)
                    })
            }
        }
        else {
            PatientForgetEmailMpin({ email })
                .then(response => {
                    if (response.data.isLoggedIn === true) {
                        setPatientId(response.data._id)
                        setIsError(false)
                        setMessage(true)
                        setShowOTP(true)
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
        <Wrapper>
            <div className=" common_box">
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            <h1>Reset Password</h1>
                            <form >
                                <div className="clearfix">
                                    <div className=" last">
                                        <div className=" full-width row">
                                            <div className="width25 ">
                                                <label className='mb-2'>Select</label>
                                                <MainSelect
                                                    value={selectedValue}
                                                    onChange={handleSelectData}
                                                >
                                                    <option value="IND">IN</option>
                                                    <option value="OTHER">Other</option>
                                                </MainSelect>
                                            </div>
                                            <div className="width70 ml-2">
                                                {selectedValue === 'OTHER' ?
                                                    <>
                                                        <label className='mb-2'>EmailId</label>
                                                        <MainInput
                                                            type="email"
                                                            name="email"
                                                            value={email.email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Email">
                                                        </MainInput>
                                                        {message && (<span className="sendotp-message  mb-2">
                                                            OTP is sent to the EmailId
                                                        </span>)}
                                                    </>
                                                    :
                                                    <>
                                                        <label className='mb-2 '>Mobile Number</label>
                                                        <MainInput
                                                            type="text"
                                                            name="mobile"
                                                            value={mobile.mobile}
                                                            maxLength={10}
                                                            pattern="[+-]?\d+(?:[.,]\d+)?"
                                                            onChange={(e) => setMobile(e.target.value)}
                                                            placeholder="Phone Number (+XX)">
                                                        </MainInput>
                                                        {message && (<span className="sendotp-message  mb-2">
                                                            OTP is sent to the mobile number
                                                        </span>)}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        {<span className="validation mb-2">{isError}</span>}

                                        {showOTP === true ?
                                            <LoginPatientOtp
                                                patientId={patientId}
                                                loginData={loginData} />
                                            :
                                            <>
                                                <div align='left' >
                                                    <MainButtonInput
                                                        onClick={handleSubmit}>
                                                        Go
                                                    </MainButtonInput>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </Wrapper >
    )
}