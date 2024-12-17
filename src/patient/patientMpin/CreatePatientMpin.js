import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import PatientApi from "../../services/PatientApi";
import Loader from "../patientHistory/Loader";

export default function CreatePatientMpin(props) {
    const { loginData } = props;
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState('');
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { patientSignUp } = PatientApi();
    const navigate = useNavigate()

    setTimeout(() => {
        setIsLoading(false)
    }, 2000)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const bodyData = {
                _id: loginData._id,
                password: password,
            }
            patientSignUp(bodyData)
                .then(response => {
                    setPatientId(response.data._id)
                    const _id = response.data._id
                    navigate(`/createprofile/${_id}`)
                })
                .catch(error => {
                    setIsError(true)
                })
        } else {
            alert("Passwords don't match");
        }

    };

    return (
        <>
            {
                isLoading ?
                    <div className='loader-container'>
                        < Loader />
                    </div >
                    :
                    <>
                        <div className="full-width">
                            <div className="mb-2">
                                <lable className=''>Enter MPIN</lable>
                            </div>
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
                            <div className='mb-2'>
                                <lable>Confirm MPIN</lable>
                            </div>
                            <MainInput
                                type="password"
                                name="password"
                                maxLength={6}
                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm MPIN"
                                required>
                            </MainInput>
                            <div align='left'>
                                <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}