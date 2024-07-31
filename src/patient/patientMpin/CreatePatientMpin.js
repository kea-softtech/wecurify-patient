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
    const [error, setError] = useState(false);
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
            setIsError(true)
        }
    }
    //     if (password === confirmPassword) {
    //         patientSignUp({ mobile, password })
    //             .then(response => {
    //                 console.log('========respobs', response)
    //                 if (!response.status) {
    //                     setPatientId(response.data._id)
    //                     const patientId = response.data._id
    //                     if (password === '' && confirmPassword === '') {
    //                         setIsError("Please enter password")
    //                     }
    //                     else if (password.length !== 6 || !/^\d+$/.test(password)) {
    //                         setError("Password must have 6 numbers");
    //                         return;
    //                     }
    //                     else {
    //                         navigate(`/createprofile/${patientId}`)
    //                     }
    //                 } else {
    //                     setIsError("Server Error")
    //                 }
    //             })
    //     } else {
    //         alert('Password dont match')
    //     }
    // };

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
                                        <div className="mb-2 pl-3 appcolor" align="left">
                                            <Link to={`/patient`}><b>Already have account</b> </Link>
                                        </div>
                                        <div className="box_login last" align="left">
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

                                            <label className='mb-2'>Enter Mpin</label>
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

                                            <label className='mb-2'>Confirm Mpin</label>
                                            <MainInput
                                                type="password"
                                                name="password"
                                                maxLength={6}
                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm MPIN"
                                                required
                                            >
                                                {isError === true ?
                                                    <span className="validation mb-2 ml-3">Passwords don't match</span>
                                                    : null}
                                                <div align='right' className="validation  mb-2 mr-3">{isError}</div>
                                            </MainInput>
                                            <div className="mr-3 " align='left'>
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