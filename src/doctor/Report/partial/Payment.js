import { TextField } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete/Autocomplete';
import React, { useState } from 'react';
import AppointmentApi from '../../../services/AppointmentApi';
import ReportApi from '../../../services/ReportApi';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function Payment(props) {
    const { reportId, appointmentId, fees, doctorId } = props;
    const navigate = useNavigate()
    const [saveMode, setSaveMode] = useState([]);
    const [patientFees, setPatientFees] = useState(fees);
    const [show, setShow] = useState(false);
    const [otherFees, setOtherFees] = useState();
    const { UpdateStatusBookingdata, } = ReportApi();
    const { createPDF } = AppointmentApi()
    const mode = [
        {
            "_id": 0,
            "name": "Cash"
        },
        {
            "_id": 1,
            "name": "Credit Card"
        },
        {
            "_id": 2,
            "name": "Debit Card"
        }, {
            "_id": 3,
            "name": "UPI"
        },
    ]

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => setShow(false)
    const handleMode = (e, selectedMode) => {
        setSaveMode(selectedMode.name)
    }

    const handleOtherFeesValue = (e) => {
        e.preventDefault();
        setOtherFees(e.target.value)
        if (e.target.value) {
            const totalAmount = parseInt(e.target.value) + parseInt(fees)
            setPatientFees(totalAmount)
        } else {
            const totalAmount = fees
            setPatientFees(totalAmount)
        }
    }


    const getPrescriptionData = () => {
        const bodyData = {
            "status": "Completed",
            "payment": "Done",
            "medicalReportId": reportId,
            "paymentMethod": saveMode,
            "total": patientFees
        }
        UpdateStatusBookingdata({ appointmentId }, bodyData)
            .then((res) => {
                createPDF(reportId)
                navigate(`/doctors/appointment/${doctorId}`)
            })
    };
    return (
        <>
            <div className='row'>
                <div className='width_40'>
                    <div className='paymentInput'>
                        <label className=' consultationFees'>
                           Consultation Fees
                        </label>

                    </div>
                </div>

                <div className='width_60'>
                    <div className='paymentInput'>
                        <input
                            type="text"
                            value={fees}
                            className="form-control"
                            name="consultationFees"
                        />
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='width_40'>
                    <div className=' paymentInput'>
                        <label className='font_weight otherFees'>Other Fees</label>
                    </div>
                </div>
                <div className='width_60'>
                    <div className=' paymentInput'>
                        <input
                            type="text"
                            value={otherFees}
                            onChange={handleOtherFeesValue}
                            className="form-control"
                            name="OtherFees"
                        />
                    </div>
                </div>
            </div>
            <div className=' border-payment' />
            <div className='row'>
                <div className='width_40'>
                    <div className=' paymentInput'>
                        <label className="font_weight totalFees">Total</label>
                    </div>
                </div>
                <div className='width50'>
                    <div className=' paymentInput'>
                        <span className=" totalInput ">{patientFees}</span>
                    </div>
                </div>
            </div>
            <div className='width_60' >
                <span className='paymentSpan mb-2 font_weight'>Mode of Payment</span>
                <Autocomplete
                    disablePortal={true}
                    disableClearable
                    disableCloseOnSelect
                    selectOnFocus
                    style={{ marginTop: 5 }}
                    fullWidth
                    id={saveMode._id}
                    value={saveMode.name}
                    onChange={handleMode}
                    getOptionLabel={(mode) => `${mode.name}`}
                    options={mode}
                    renderInput={(params) => <TextField {...params} label="Select" />}
                />
            </div>

            {/* <div className=' border-payment' />
            <div className='paymentInput'>
                <label className='totalFees'>Total</label>
                <span className=" totalInput ">{patientFees}</span>

            </div> */}
            <div className="text-center">
                <input
                    onClick={handleShow}
                    type="submit"
                    className="btn_1 paymentbtn "
                    value="Pay"
                />
            </div>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You want to pay this amount.? </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => getPrescriptionData()}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}