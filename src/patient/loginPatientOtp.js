import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { MainInput } from "../mainComponent/mainInput";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { setSlotData } from "../recoil/atom/setSlotData";

function LoginPatientOtp(props) {
    const navigate = useNavigate()
    const { patientId, loginData } = props;
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn)
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const [slotItem, setSlotItem] = useRecoilState(setSlotData);
    const [loginOtp, setLoginOtp] = useState('');
    const getOTP = loginData.otp
    const [errormessage, setErrormessage] = useState(false);
    const { patientLoginOtp } = PatientApi()

    const handleSubmit = (e) => {
        e.preventDefault();
        patientLoginOtp({ otp: loginOtp, _id: patientId })
            .then((response) => {
                setPatientData(patientId)
                setLoggedIn(loginData.isLoggedIn)
                const isLoggedIn = loginData.isLoggedIn
                if (getOTP !== loginOtp) {
                    setErrormessage("Please Enter Valid OTP");
                } else {
                    if (isLoggedIn !== true) {
                        navigate(`/createprofile/${patientId}`);
                    } else if (slotItem._id) {
                        navigate(`/patientprofile/${patientId}`);
                    }
                    else {
                        navigate(`/`);
                    }
                }
            })
    }
    return (
        <div className="row full-width">
            <div className="width60 ">
                <MainInput
                    type="text"
                    name="otp"
                    maxLength={6}
                    onChange={(e) => setLoginOtp(e.target.value)}
                    placeholder="6 digit OTP" >
                </MainInput>
                {errormessage && (<span className="validation">{errormessage}</span>)}
            </div>

            <div className="width25 ml-2">
                <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
            </div>
        </div>
    )

}
export { LoginPatientOtp }