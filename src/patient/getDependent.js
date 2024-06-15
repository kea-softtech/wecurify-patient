import React, { useEffect, useState } from 'react'
import PatientApi from '../services/PatientApi';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { setSessionData } from '../recoil/atom/setSessionData';
import { setSlotData } from '../recoil/atom/setSlotData';
import { Button, Modal } from 'react-bootstrap';
import { setPatientProfileData } from '../recoil/atom/setPatientProfileData';

export default function GetDependent(props) {
    const { patientId , doctorId} = props;
    const [fetchPatientData] = useRecoilState(setPatientProfileData)
    const [slotItem] = useRecoilState(setSlotData)
    const [bookSlot, setbookSlot] = useState([]);
    const [show, setShow] = useState(false);
    const [sessionData] = useRecoilState(setSessionData)
    const { paymentInfo } = PatientApi()
    const navigate = useNavigate()

    useEffect(() => {

    }, [fetchPatientData])

    const handleShow = (item) => {
        setbookSlot(item)
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleSelectedSlot = (item) => {
        const startDate = (sessionData.selectedDate + " " + slotItem.time)
        const slotId = slotItem._id
        const transactionData = {
            "DoctorId": sessionData.session.doctorId,
            "ClinicId": sessionData.session.clinicId,
            "slotId": slotId,
            "patientId": patientId,
            "dependentId": item._id,
            "transactionId": '123',
            "currency": 'INR',
            "fees": sessionData.session.fees,
            "date": sessionData.slotDate,
            "day": sessionData.session.day,
            "slotTime": slotItem.time,
            "daySlotId": sessionData.session._id,
            "selectedDate": sessionData.selectedDate,
            "timeSlot": sessionData.session.timeSlot,
            "startDate": startDate,
            "status": "Ongoing",
            "payment": "hold"
        }
        paymentInfo(transactionData)
            .then((res) => {
                if (slotItem._id) {
                    navigate(`/confirm/${res._id}`)
                } else {
                    navigate(`/booking/${doctorId}`)
                }
                handleClose()
            })
        navigate(`/`)
    }
    return (
        <>
            {fetchPatientData["dependent"]&&fetchPatientData["dependent"].length > 0 ?
                <div className="col-md-6 mb-2">
                    <div className="box_general_4 cart patientDetails">
                        <>
                            <div className="underline">
                                <div className="form_title">
                                    <h3>dependent Details</h3>
                                </div>
                            </div>
                            <div className="patientDataStyle">
                                {fetchPatientData["dependent"].map((item, i) => {
                                    return (
                                        <div key={i} className="row">
                                            <div className='col-md-7'>
                                                {item.name}
                                            </div>
                                            <div className='col-md-5' align='right'>
                                                <Link onClick={() => handleShow(item)} className="btn">
                                                    <i className="arrow_carrot-right_alt" style={{ fontSize: 20 }}></i>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    </div>
                </div>
                : null}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You Want To Book This Slot. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(bookSlot)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}