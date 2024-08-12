import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { Wrapper } from "../../mainComponent/Wrapper";
import { ForgotMpin } from "./ForgotMpin";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import PatientApi from "../../services/PatientApi";

export default function ForgotPatientMpin() {
    const { patientId } = useParams()
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    // const [error, setError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId);
    const { loginPatient } = PatientApi();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError("Mobile number must have 10 number")
        }
        else {
            loginPatient({ mobile })
                .then(response => {
                    if (response.data) {
                        setIsLoggedIn(response.data.isLoggedIn)
                    }
                    else {
                        setIsError('Server Error')
                    }
                })
        }
    };

    return (
        <Wrapper>
                <div className="full-width common_box">
                    <div className="bg_color_2">
                        <div className="container margin_60_35">
                            <div id="login-2">
                                <h1>Reset Password</h1>
                                <form >
                                    <div className="box_form clearfix">
                                        <div className="box_login last">
                                            <div className="">
                                                <label className='mb-2 ml-3'>Mobile Number</label>
                                                <div className="mr-2 col-md-12">
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
                                                {isLoggedIn === true ?
                                                    <ForgotMpin doctorId={doctorId} patientId={patientId} mobile={mobile} /> :
                                                    <>
                                                        <span className="validation mb-2 mr-3">{isError}</span>
                                                        <div align='left' className="ml-3" >
                                                            <MainButtonInput onClick={handleSubmit}>Go</MainButtonInput>
                                                        </div>
                                                    </>
                                                }
                                            </div>
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