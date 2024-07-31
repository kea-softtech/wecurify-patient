import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import PatientApi from "../../services/PatientApi";

function ForgotMpin(props) {
    const { doctorId, mobile } = props;
    const [password, setPassword] = useState('');
    console.log('------', password.length)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const { loginPatient } = PatientApi()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            loginPatient({ mobile, password })
                .then(response => {
                    if (password === '' && confirmPassword === '') {
                        setIsError(true)
                    }
                    else if (password.length !== 6 || !/^\d+$/.test(password)) {
                        setError(true);
                        return;
                    }
                    else {
                        navigate(`/patient`)
                    }
                })
        } else {
            alert('Password dont match')
        }
    };
    return (
        <div className="full-width">
            <label className='mb-2 ml-3'>Enter Mpin</label>
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
            <label className='mb-2 ml-3'>Confirm MPIN</label>
            <div className="col-md-12">
                <MainInput
                    type="password"
                    name="password"
                    MaxLength={6}
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm MPIN"
                    required>
                </MainInput>
            </div>
            {isError === true ?
                <span className="validation mb-2 ml-3">Please enter password</span>
                : null}
            {error === true ?
                <span className="validation mb-2 ml-3">Password must have 6 number</span>
                : null}
            <div className=" ml-3" align='left'>
                <MainButtonInput onClick={handleSubmit}>Set Mpin</MainButtonInput>
            </div>
        </div>
    )

}
export { ForgotMpin }