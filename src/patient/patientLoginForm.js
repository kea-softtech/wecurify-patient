import { LoginPatientOtp } from "../patient/loginPatientOtp";
import { useState } from "react";
import { MainInput } from "../mainComponent/mainInput";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";

function PatientLoginForm(props) {
    const { redirection, doctorId } = props
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [showOTP, setShowOTP] = useState(false)
    const [loginData, setLoginData] = useState([])
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const { patientLogin } = PatientApi()
    const getOTPSection = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else {
            patientLogin({ mobile: mobile })
                .then(data => {
                    setPatientData(data._id)
                    alert(data.otp)
                    setLoginData(data)
                    setShowOTP(true)
                })
        }
    };

    return (
        <div className="bg_color_2">
            <div className="container margin_60_35">
                <div id="login-2">
                    <form>
                        <div className="box_form clearfix">
                            Enter Your Mobile Number
                            <div className="box_login last">
                                <div className="full-width">
                                    <div className="row mt-3">
                                        <div className="width75">
                                            <MainInput
                                                type="text"
                                                name="mobile"
                                                value={mobile.mobile}
                                                maxLength={10}
                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="Phone Number (+XX)">
                                            </MainInput>
                                            {<span className="validation">{isError}</span>}
                                        </div>
                                        <div className="width25 ml-2">
                                            <MainButtonInput onClick={getOTPSection}>Go</MainButtonInput>
                                        </div>
                                    </div>
                                </div>

                                {showOTP === true ?
                                    <LoginPatientOtp patientId={patientData} loginData={loginData} redirection={redirection} />
                                    : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
export { PatientLoginForm }

