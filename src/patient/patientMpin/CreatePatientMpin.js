import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { Wrapper } from "../../mainComponent/Wrapper";
import PatientApi from "../../services/PatientApi";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";

export default function CreatePatientMpin() {
    //for show otp input
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);

    const { patientSignUp } = PatientApi();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else if (password === confirmPassword) {
            patientSignUp({ mobile, password })
                .then(response => {
                    const patientId = response.data._id
                    setPatientId(response.data._id)
                    navigate(`/createprofile/${patientId}`)
                })
                .catch(error => {
                    setIsError(true)
                })
        } else {
            alert("Passwords don't match");
        }
    };

    return (
        <Wrapper>
            <div className="row ">
                <div className="full-width common_box">
                    <div className="bg_color_2">
                        <div className="container margin_60_35">
                            <div id="login-2">
                                <h1>Login to Wecurify</h1>
                                <form >
                                    <div className="box_form clearfix">
                                        <div className="width50 mb-2 pl-3 appcolor" align="left">
                                            <Link to={`/patient`}>Already have account </Link>
                                        </div>
                                        <div className="box_login last">
                                            <lable className='mb-2' align="left">Mobile Number</lable>
                                            <MainInput
                                                name="mobile"
                                                value={mobile.mobile}
                                                type="text"
                                                maxLength={10}
                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="Phone Number (+XX)" >
                                            </MainInput>
                                            <div align='right' className="validation ">{isError}</div>

                                            <lable className='mb-2' align="left">Enter MPIN</lable>
                                            <MainInput
                                                type="password"
                                                name="password"
                                                maxLength={6}
                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="New MPIN"
                                                required
                                            >
                                            </MainInput>
                                            
                                            <lable className='mb-2' align="left">Confirm MPIN</lable>
                                            <MainInput
                                                type="password"
                                                name="password"
                                                maxLength={6}
                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm MPIN"
                                                required
                                            >
                                            </MainInput>
                                            <div className="mr-3" align='right'>
                                                <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
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