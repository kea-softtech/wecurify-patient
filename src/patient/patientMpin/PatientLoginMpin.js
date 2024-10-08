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
import { Modal } from "react-bootstrap";
import ForgotPatientLoginMpin from "./ForgotPatientLoginMpin";
import CreatePatientLoginMpin from "./CreatePatientLoginMpin";

function PatientLoginMpin(props) {
    const { onSubmit,onForgotAccount, onCreateAccount } = props;
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const [slotItem] = useRecoilState(setSlotData);
    const { patientSignIn } = PatientApi();
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(setloggedIn);
    const [showForgot, setShowForgot] = useState(false);
    const navigate = useNavigate();

    // const handleForgotShow = () => setShowForgot(true);
    // const handleForgotClose = () => setShowForgot(false);

    const handleMpin = (e) => {
        e.preventDefault();
        if (mobile.length < 10) {
            setIsError(true);
        } else {
            patientSignIn({ mobile, password })
                .then(data => {
                    if (data.data && data.data.isLoggedIn) {
                        setPatientId(data.data._id);
                        setIsLoggedIn(data.data.isLoggedIn);
                        navigate(slotItem._id ? `/patientprofile/${data.data._id}` : `/`);
                    } else {
                        setIsError(true);
                    }
                })
                .catch(() => setError(true));
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
                            <Link onClick={onForgotAccount}>Forgot MPIN </Link>
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
                    {isError && <div className="validation mb-2">Enter valid mobile number and password</div>}
                    {error && <div className="validation mb-2">Server error</div>}
                </div>
            </form>

            {/* <Modal show={showForgot} onHide={handleForgotClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset MPIN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForgotPatientLoginMpin patientId={patientId} onSubmit={handleForgotClose} />
                </Modal.Body>
            </Modal> */}

            {/* <Modal show={showCreate} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePatientLoginMpin modalShowBox={onSubmit} patientId={patientId} onSubmit={handleCreateClose} />
                </Modal.Body>
            </Modal> */}
        </div>
    );
}

export { PatientLoginMpin };
