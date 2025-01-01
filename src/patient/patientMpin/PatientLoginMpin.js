import React, { useState } from "react";
import { MainInput } from "../../mainComponent/mainInput";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { useRecoilState } from "recoil";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import PatientApi from "../../services/PatientApi";
import { setloggedIn } from "../../recoil/atom/setloggedIn";
import { setSlotData } from "../../recoil/atom/setSlotData";
import { SecondaryButton } from "../../mainComponent/SecondaryButton";
import { MainSelect } from "../../mainComponent/mainSelect";
import { PatientMpin } from "./PatientMpin";
import { LoginPatientOtp } from "../loginPatientOtp";
import ForgotPatientLoginMpin from "./ForgotPatientLoginMpin";
import { Modal } from "react-bootstrap";

function PatientLoginMpin(props) {
    const { onSubmit, onForgotAccount, onCreateAccount } = props;
    const [mobile, setMobile] = useState("");
    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [slotItem] = useRecoilState(setSlotData);
    const { patientSignIn } = PatientApi();
    const [showMpin, setShowMpin] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [showForgot, setShowForgot] = useState(false);
    const [loginData, setLoginData] = useState([])
    const [message, setMessage] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const { loginPatient, loginPatientEmail } = PatientApi();

    const handleSelectData = ((e) => {
        const selectedItem = e.target.value
        setSelectedValue(selectedItem)
    })

    const handleLogin = (e) => {
        e.preventDefault();
        if (selectedValue === "OTHER") {
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                setIsError("Please enter a valid email address");
                return;
            } else {
                loginPatientEmail({ email })
                    .then((data) => {
                        if (data.data.password) {
                            setPatientId(data.data._id);
                            setShowMpin(true);
                            setIsError("");
                        } else {
                            setShowOtp(true);
                            setMessage(true);
                            setIsError("");
                        }
                        setLoginData(data.data);
                    })
                    .catch(() => setIsError("Failed to login with email"));
            }
        } else {
            if (!mobile) {
                setIsError("Mobile number is required");
                return;
            }
            if (mobile.length < 10) {
                setIsError("Mobile number must be 10 digits");
                return;
            }
            loginPatient({ mobile })
                .then((data) => {
                    if (data.data.password) {
                        setPatientId(data.data._id);
                        setShowMpin(true);
                        setIsError("");
                    } else {
                        alert(data.data.otp)
                        setShowOtp(true);
                        setMessage(true);
                    }
                    setLoginData(data.data);
                })
                .catch(() => setIsError("Failed to login with mobile"));
        }
    };

    const handleForgotShow = () => {
        setShowForgot(true);
    }

    const handleForgotClose = () => setShowForgot(false);

    return (
        <div>
            <form>
                <div className=" clearfix">
                    <div className="last ">
                        <div className="full-width row">
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
                                            value={mobile.email}
                                            onChange={(e) => setEmailId(e.target.value)}
                                            placeholder="Email">
                                        </MainInput>
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
                                    </>
                                }
                            </div>

                        </div>
                        {message && (<span className="sendotp-message  mb-2">
                            OTP is sent to the mobile number
                        </span>)}

                        <div className="validation mb-2">{isError}</div>

                        <div>
                            {showMpin === true ?
                                <>
                                    <PatientMpin
                                        mobile={mobile}
                                        email={email}
                                        loginData={loginData} />
                                    <Outlet />
                                </>
                                :
                                <>
                                    {showOtp === true ?
                                        <>
                                            <LoginPatientOtp
                                                patientId={patientId}
                                                loginData={loginData} />
                                            <Outlet />
                                        </>
                                        :
                                        <div align='left'>
                                            <MainButtonInput
                                                onClick={handleLogin}>
                                                Go
                                            </MainButtonInput>
                                        </div>

                                    }
                                </>
                            }

                        </div>
                        {/* <div align='right'>
                            <Link onClick={handleForgotShow} >Set / Forgot MPIN</Link>
                        </div> */}
                    </div>
                </div>
            </form>

            <Modal show={showForgot} onHide={handleForgotClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset MPIN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForgotPatientLoginMpin
                        patientId={patientId}
                        onSubmit={handleForgotClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export { PatientLoginMpin };