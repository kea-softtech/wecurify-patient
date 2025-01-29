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
    const [isError, setIsError] = useState('');
    const [password, setPassword] = useState('');
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { patientSignUp } = PatientApi();
    const navigate = useNavigate();
    const [data, setData] = useState(
        {
            password: '',
            confirmPassword: ''
        }
    );

    setTimeout(() => {
        setIsLoading(false)
    }, 2000)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = data.password.trim();
        const confirmPassword = data.confirmPassword.trim();
        if (password === '' || confirmPassword === '') {
            setIsError('Password fields cannot be empty');
            return;
        }
        if (password !== confirmPassword) {
            setIsError('Passwords do not match');
            return;
        }
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
                .finally(() => {
                    setIsLoading(false);
                });
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
                                onChange={handleChange}
                                placeholder="New MPIN"
                                required
                            >
                            </MainInput>
                            <div className='mb-2'>
                                <lable>Confirm MPIN</lable>
                            </div>
                            <MainInput
                                type="password"
                                name="confirmPassword"
                                maxLength={6}
                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                onChange={handleChange}
                                placeholder="Confirm MPIN"
                                required>
                            </MainInput>
                            <div className="validation mt-2">
                                {isError}
                            </div>
                            <div align='left'>
                                <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}