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
    const { doctorId, onSubmit } = props
    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("")
    const [slotItem] = useRecoilState(setSlotData)
    const { patientSignIn } = PatientApi()
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(setloggedIn);
    const [show, setShow] = useState(false);
    const [createShow, setCreateShow] = useState(false);
    const navigate = useNavigate();

    const handleForgotShow = () => {
        setShow(true);
    }
    const handleForgotClose = () => setShow(false);

    const handleCreateshow = () => setCreateShow(true);
    const handleCreateClose = () => setCreateShow(false);

    const handleMpin = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError(true)
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
                            setIsError(true)
                        }
                    }
                    else {
                        setError(true)
                    }
                })
        }
    }

    return (
        <div>
            <form>
                <div className=" clearfix">
                    <div className="last">
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
                        <label className='mb-2'>MPIN</label>
                        <MainInput
                            type="password"
                            name="password"
                            maxLength={6}
                            pattern="[+-]?\d+(?:[.,]\d+)?"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Mpin"
                            required>
                        </MainInput>

                        <div className="width50 mt-4" align="left">
                            <Link onClick={handleForgotShow}>Forgot MPIN </Link>
                        </div>
                        <div className="row" align='right'>
                            <div className="mr-2 mt-2" >
                                <MainButtonInput onClick={handleMpin}>Login</MainButtonInput>
                            </div>
                            <div className="mr-2 mt-2" >
                                <SecondaryButton onClick={handleCreateshow}>Create Account</SecondaryButton>
                            </div>
                        </div>
                    </div>
                    {isError === true ?
                        <div className="validation mb-2">
                            Enter valid mobile number and password
                        </div>
                        : null}
                    {error === true ?
                        <div className="validation mb-2">
                            Server error
                        </div>
                        : null}
                </div>
            </form>
            <Modal show={show} onHide={handleForgotClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Mpin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForgotPatientLoginMpin
                        patientId={patientId}
                        onSubmit={handleForgotClose} />
                </Modal.Body>
            </Modal>
            <Modal show={createShow} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePatientLoginMpin
                        patientId={patientId}
                        onSubmit={handleForgotClose} />
                </Modal.Body>
            </Modal>
        </div>
    )
}
export { PatientLoginMpin }

