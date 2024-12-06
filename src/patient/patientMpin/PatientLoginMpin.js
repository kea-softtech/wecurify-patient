import React, { useState } from "react";
import { MainInput } from "../../mainComponent/mainInput";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import PatientApi from "../../services/PatientApi";
import { setloggedIn } from "../../recoil/atom/setloggedIn";
import { setSlotData } from "../../recoil/atom/setSlotData";
import { SecondaryButton } from "../../mainComponent/SecondaryButton";

function PatientLoginMpin(props) {
    const { onSubmit,onForgotAccount, onCreateAccount } = props;
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [slotItem] = useRecoilState(setSlotData);
    const { patientSignIn } = PatientApi();
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(setloggedIn);
    const navigate = useNavigate();

    const handleMpin = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.');
        } else {
            patientSignIn({ mobile, password })
                .then(data => {
                    if (data.data && data.data.isLoggedIn) {
                        setPatientId(data.data._id);
                        setIsLoggedIn(data.data.isLoggedIn);
                        navigate(slotItem._id ? `/patientprofile/${data.data._id}` : `/`);
                    } else {
                        setIsError('You have entered an invalid credentails');
                    }
                })
                .catch(() => setIsError('server error'));
        }
    };

    return (
        <div>
            <form onSubmit={handleMpin}>
                <div className="clearfix">
                    <div className="last">
                        <label className='mb-2'>Mobile Number</label>
                        <MainInput
                            type="text"
                            name="mobile"
                            value={mobile}
                            maxLength={10}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Phone Number (+XX)"
                        />
                        <label className='mb-2'>MPIN</label>
                        <MainInput
                            type="password"
                            name="password"
                            maxLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter MPIN"
                            required
                        />
                        <div className="width50 mt-4" align="left">
                            <Link onClick={onForgotAccount}>Set / Forgot MPIN </Link>
                        </div>
                        <div className="row" align='right'>
                            <div className="mr-2 mt-2">
                                <MainButtonInput type="submit">Login</MainButtonInput>
                            </div>
                            <div className="mr-2 mt-2">
                                <SecondaryButton onClick={onCreateAccount}>Create Account</SecondaryButton>
                            </div>
                        </div>
                    </div>
                    <div className="validation mb-2">{isError}</div>
                </div>
            </form>
        </div>
    );
}

export { PatientLoginMpin };
