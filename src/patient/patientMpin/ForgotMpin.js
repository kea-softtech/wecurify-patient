import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import PatientApi from "../../services/PatientApi";
import { useRecoilState } from "recoil";
import { setSlotData } from "../../recoil/atom/setSlotData";
import { Modal } from "react-bootstrap";
import { PatientLoginMpin } from "./PatientLoginMpin";

function ForgotMpin(props) {
    const { doctorId, mobile } = props;
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const { PatientForgetMpin } = PatientApi()
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [show, setShow] = useState(false);
    const [data, setData] = useState(
        {
            password: '',
            confirmPassword: ''
        }
    );
    const navigate = useNavigate()
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = data.password.trim();
        const confirmPassword = data.confirmPassword.trim();
        if (password === '' || confirmPassword === '') {
            setIsError("Please enter password");
        }
        else if (password === confirmPassword) {
            const bodyData = {
                mobile: mobile,
                password: password,
            }
            PatientForgetMpin(bodyData)
                .then(response => {
                    const patientId = response.data._id
                    if (slotItem._id) {
                        setShow(true)
                    } else {
                        navigate(`/patient`)
                    }
                })
        }
        else {
            setIsError("Password must have 6 number")
        }
        
    };
    return (
        <div className="full-width">
            <label className='mb-2 '>Enter Mpin</label>
            <div className="">
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
            </div>
            <label className='mb-2 '>Confirm MPIN</label>
            <div className="">
                <MainInput
                    type="password"
                    name="confirmPassword"
                    maxLength={6}
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    onChange={handleChange}
                    placeholder="Confirm MPIN"
                    required>
                </MainInput>
            </div>
            <span className="validation mb-2 ml-3">{isError}</span>
            <div align='left'>
                <MainButtonInput onClick={handleSubmit}>Set Mpin</MainButtonInput>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login to Fly4smiles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatientLoginMpin
                        onSubmit={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    )

}
export { ForgotMpin }