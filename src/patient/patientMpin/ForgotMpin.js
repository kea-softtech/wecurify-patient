import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import PatientApi from "../../services/PatientApi";

function ForgotMpin(props) {
    const { doctorId, mobile } = props;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loginPatient } = PatientApi()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            loginPatient({ mobile, password })
                .then(response => {
                    navigate(`/patient`)
                })
        } else {
            alert("Passwords don't match");
        }
    };
    return (
        <div className="row full-width">
            <lable className='mb-2'>Enter MPIN</lable>
            <div className="col-md-12">
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
            </div>
            <lable className='mb-2'>Confirm MPIN</lable>
            <div className="col-md-12">
                <MainInput
                    type="password"
                    name="password"
                    maxLength={6}
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm MPIN"
                    required>
                </MainInput>
            </div>
            <div className="width25 ml-2">
                <MainButtonInput onClick={handleSubmit}>Set Mpin</MainButtonInput>
            </div>
        </div>
    )

}
export { ForgotMpin }