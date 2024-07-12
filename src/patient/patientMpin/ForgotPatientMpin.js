import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import UserLinks from "../../doctor/Dashboard-card/partial/uselinks";
import { MainNav } from "../../mainComponent/mainNav";
import { Wrapper } from "../../mainComponent/Wrapper";
import { ForgotMpin } from "./ForgotMpin";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import PatientApi from "../../services/PatientApi";

export default function ForgotPatientMpin() {
    //for show otp input
    const { patientId } = useParams()
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [doctorId, setdoctorId] = useRecoilState(setDoctorId);
    const { loginPatient } = PatientApi();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginPatient({ mobile })
            .then(response => {
                setIsLoggedIn(response.data.isLoggedIn)

            })
    };

    return (
        <Wrapper>
            <div className="row ">
                <div className="full-width common_box">
                    <div className="bg_color_2">
                        <div className="container margin_60_35">
                            <div id="login-2">
                                <h1>Reset Password</h1>
                                <form >
                                    <div className="box_form clearfix">
                                        <div className="box_login last">
                                            <div className="row">
                                                <lable className='mb-2'>Mobile Number</lable>
                                                <div className="col-md-12">
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
                                                <div>{isError}</div>
                                                {isLoggedIn === true ?
                                                    <ForgotMpin doctorId={doctorId} patientId={patientId} mobile={mobile} /> :
                                                    <>
                                                        {isError === true ? <span className="validation mb-2 ">Please Enter Valid Mobile Number</span> : null}
                                                        <div className="mr-3" align='right'>
                                                            <MainButtonInput onClick={handleSubmit}>Go</MainButtonInput>
                                                        </div>
                                                    </>}
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}