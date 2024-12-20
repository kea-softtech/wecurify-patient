import React, { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import PatientApi from "../../services/PatientApi";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { MainInput } from "../../mainComponent/mainInput";
import { MainSelect } from "../../mainComponent/mainSelect";
import { LoginPatientOtp } from "../loginPatientOtp";

export default function ForgotPatientLoginMpin(props) {
    const [mobile, setMobile] = useState("");
    const [email, setEmailId] = useState("");
    const [isError, setIsError] = useState(false);
    const [loginData, setLoginData] = useState([])
    const [selectedValue, setSelectedValue] = useState('')
    const [message, setMessage] = useState(false)
    const { validLoginPatient, PatientForgetEmailMpin } = PatientApi();
    const [showOTP, setShowOTP] = useState(false);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);


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
        <div >
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
                <div className="validation">{isError} </div>
            </div>

            {showOTP === true ?
                <LoginPatientOtp
                    patientId={patientId}
                    loginData={loginData} />
                // {showOTP === true && isError !== true ?
                //     <ForgotMpin
                //         doctorId={doctorId}
                //         mobile={mobile}
                //         email={email}
                //     /> 
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
        </div >
    )
}