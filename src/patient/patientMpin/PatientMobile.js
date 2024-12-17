import React, { useState } from "react";
import { MainInput } from "../../mainComponent/mainInput";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { useRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import PatientApi from "../../services/PatientApi";
import { PatientMpin } from "./PatientMpin";
import { LoginPatientOtp } from "../loginPatientOtp";
import { MainSelect } from "../../mainComponent/mainSelect";

function PatientMobile() {
    const [mobile, setMobile] = useState("");
    const [email, setEmailId] = useState("");
    const [isError, setIsError] = useState(false);
    const [showMpin, setShowMpin] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [loginData, setLoginData] = useState([])
    const [message, setMessage] = useState(false)
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [selectedValue, setSelectedValue] = useState('')
    const { loginPatient, loginPatientEmail } = PatientApi();

    const handleSelectData = ((e) => {
        const selectedItem = e.target.value
        setSelectedValue(selectedItem)
    })

    const handleMobile = (e) => {
        e.preventDefault()
        if (mobile) {
            if (mobile.length < 10) {
                setIsError('Mobile number must be 10 digits')
            }
            else {
                loginPatient({ mobile })
                    .then(data => {
                        if (data.data.password) {
                            setPatientId(data.data._id)
                            setShowMpin(true)
                            setIsError(false)
                        }
                        else {
                            setShowOtp(true)
                            setMessage(true)
                        }
                        setLoginData(data.data)
                    })
            }
        } else {
            loginPatientEmail({ email })
                .then(data => {
                    if (data.data.password) {
                        setPatientId(data.data._id)
                        setShowMpin(true)
                        setIsError(false)
                    }
                    else {
                        setShowOtp(true)
                        setMessage(true)
                    }
                    setLoginData(data.data)
                })
        }
    }

    return (
        <div className="bg_color_2">
            <div className="container margin_60_35">
                <div id="login-2">
                    <h1>Login to Fly4smile</h1>
                    <form>
                        <div className=" clearfix">
                            <div className="last ">
                                <div className=" full-width row">
                                    <div className="width25 ">
                                        <label className='mb-2'>Select</label>
                                        <MainSelect
                                            value={selectedValue}
                                            onChange={handleSelectData}
                                        >
                                            <option value="IND">IND</option>
                                            <option value="OTHER">OTHER</option>
                                        </MainSelect>
                                    </div>
                                    <div className="width70 ml-2">
                                        {selectedValue === 'OTHER' ?
                                            <>
                                                <label className='mb-2'>EmailId</label>
                                                <MainInput
                                                    type="email"
                                                    name="email"
                                                    value={mobile.email}
                                                    onChange={(e) => setEmailId(e.target.value)}
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
                                <div className="validation mb-2">{isError}</div>

                                <div>
                                    {showMpin === true ?
                                        <>
                                            <PatientMpin
                                                mobile={mobile}
                                                email={email}
                                                loginData={loginData} />
                                            <Outlet />
                                        </>
                                        :
                                        <>
                                            {showOtp === true ?
                                                <>
                                                    <LoginPatientOtp
                                                        patientId={patientId}
                                                        loginData={loginData} />
                                                    <Outlet />
                                                </>
                                                :
                                                <div align='left'>
                                                    <MainButtonInput
                                                        onClick={handleMobile}>
                                                        Go
                                                    </MainButtonInput>
                                                </div>

                                            }
                                        </>
                                    }

                                </div>
                                {/* <div className="row" align='right'>
                                    <div className="mr-2 mt-2" >
                                        <MainButtonInput onClick={handleMpin}>Login</MainButtonInput>
                                    </div>
                                    <div className="mr-2 mt-2" >
                                        <SecondaryButton onClick={createMPIN}>Create Account</SecondaryButton>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
export { PatientMobile }

