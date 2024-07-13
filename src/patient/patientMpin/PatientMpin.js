import React, { useState } from "react";
import { MainInput } from "../../mainComponent/mainInput";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import PatientApi from "../../services/PatientApi";
import { setloggedIn } from "../../recoil/atom/setloggedIn";

function PatientMpin(props) {
    const { doctorId } = props
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState("")
    const { patientSignIn } = PatientApi()
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(setloggedIn);
    const navigate = useNavigate();

    const handleMpin = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else {
            patientSignIn({ mobile, password })
                .then(data => {
                    if (data.data.isLoggedIn === true) {
                        navigate(`/`)
                        setPatientId(data.data._id)
                        setIsLoggedIn(data.data.isLoggedIn )
                    }
                    else {
                        setIsError("Enter Valid Mobile number and Password")
                    }
                })
        }
    }

    return (
        <div className="bg_color_2">
            <div className="container margin_60_35">
                <div id="login-2">
                    <h1>Login to Wecurify</h1>
                    <form>
                        <div className="box_form clearfix">
                            <div className="width50 mb-2 pl-3" align="left">
                                <Link to={`/createpatientmpin`}>Create Account </Link>
                            </div>
                            <div className="box_login last">
                                <div className="width_80 ml-2 mr-2 ">
                                    <label className='mb-2'>Mobile Number</label>
                                    <MainInput
                                        type="text"
                                        name="mobile"
                                        value={mobile.mobile}
                                        maxLength={10}
                                        pattern="[+-]?\d+(?:[.,]\d+)?"
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="Phone Number (+XX)">
                                    </MainInput>

                                </div>
                                {/* <lable align='left'>Enter MPIN</lable> */}
                                <div className="width_80 ml-2 mr-2">
                                    <label className='mb-2'>Mpin</label>
                                    <MainInput
                                        className=""
                                        type="password"
                                        name="password"
                                        maxLength={6}
                                        pattern="[+-]?\d+(?:[.,]\d+)?"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Mpin"
                                        required>
                                    </MainInput>
                                </div>
                                {<span className="validation mt-2">{isError}</span>}
                                <div className="width50 mt-4" align="left">
                                    <Link to={`/forgetpatientmpin`}>Forgot MPIN </Link>
                                </div>
                                <div className="mr-2 mt-2" align='right'>
                                    <MainButtonInput onClick={handleMpin}>Login</MainButtonInput>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
export { PatientMpin }

