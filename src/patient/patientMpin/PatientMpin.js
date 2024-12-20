import React, { useState } from "react";
import { MainInput } from "../../mainComponent/mainInput";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import PatientApi from "../../services/PatientApi";
import { setloggedIn } from "../../recoil/atom/setloggedIn";
import { setSlotData } from "../../recoil/atom/setSlotData";

function PatientMpin(props) {
    const { mobile, email } = props
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState("")
    const [slotItem] = useRecoilState(setSlotData)
    const { patientSignIn, PatientSignInEmail } = PatientApi()
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(setloggedIn);
    const navigate = useNavigate();

    const handleMpin = (e) => {
        e.preventDefault()
        if (mobile) {
            if (mobile.length < 10) {
                setIsError('Mobile number must be 10 digits.')
            }
            else {
                patientSignIn({ mobile, password })
                    .then(data => {
                        if (data.data) {
                            if (data.data.isLoggedIn === true) {
                                setPatientId(data.data._id)
                                if (slotItem._id) {
                                    navigate(`/patientprofile/${data.data._id}`)
                                } else {
                                    navigate(`/`)
                                }
                                setIsLoggedIn(data.data.isLoggedIn)
                            }
                            else {
                                setIsError('You have entered an invalid credentails');
                            }
                        }
                        else {
                            setIsError('server error')
                        }
                    })
            }
        }
        else {
            PatientSignInEmail({ email, password })
                .then(data => {
                    if (data.data) {
                        if (data.data.isLoggedIn === true) {
                            setPatientId(data.data._id)
                            if (slotItem._id) {
                                navigate(`/patientprofile/${data.data._id}`)
                            } else {
                                navigate(`/`)
                            }
                            setIsLoggedIn(data.data.isLoggedIn)
                        }
                        else {
                            setIsError('You have entered an invalid credentails');
                        }
                    }
                    else {
                        setIsError('server error')
                    }
                })
        }
    }

    const createMPIN = () => {
        navigate(`/createpatientmpin`)
    }

    return (

        <form>
            <div className=" clearfix">
                <label className='mb-2'>MPIN</label>
                <MainInput
                    type="password"
                    className='form-group'
                    name="password"
                    maxLength={6}
                    pattern="^[7-9]\d{9}$"
                    // onChange={(e) => {
                    //     let value = e.target.value;
                    //     value = value.replace(/\D/g, '');
                    //     setPassword({ ...password, password: value });
                    // }}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    placeholder="Enter Mpin"
                    required>
                </MainInput>

                <div className="validation mb-2">{isError}</div>

                {/* <div className="width50 mt-5" align="left">
                    <Link to={`/forgetpatientmpin`}>Set / Forgot MPIN </Link>
                </div> */}
                <div className="row" align='right'>
                    <div className="mr-2 mt-2" >
                        <MainButtonInput onClick={handleMpin}>Login</MainButtonInput>
                    </div>
                    {/* <div className="mr-2 mt-2" >
                        <SecondaryButton onClick={createMPIN}>Create Account</SecondaryButton>
                    </div> */}
                </div>
            </div>
            {/* </div> */}
        </form>

    )
}
export { PatientMpin }

