import React, { useEffect, useState } from 'react'
import PatientApi from '../services/PatientApi';
import { useRecoilState } from 'recoil';
import { setDependentId } from '../recoil/atom/setDependentId';
import { Link, useNavigate } from 'react-router-dom';
import { setSessionData } from '../recoil/atom/setSessionData';
import { setSlotData } from '../recoil/atom/setSlotData';
import { Button, Modal } from 'react-bootstrap';

export default function GetDependent(props) {
    const { patientId } = props;
    const [fetchPatientData, setFetchPatientData] = useState([])
    const [dependentId, setDependentsId] = useRecoilState(setDependentId)
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [bookSlot, setbookSlot] = useState([]);
    console.log('========slotData',)
    const [show, setShow] = useState(false);
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const { patientDetailsData, paymentInfo } = PatientApi()
    const navigate = useNavigate()

    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        patientDetailsData({ patientId })
            .then((response) => {
                setFetchPatientData(response[0].dependent)
            })
    }
    const handleShow = (item) => {
        setSlotItem('')
        setSlotItem(item)
        // navigate("patient")
        setbookSlot(item)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }
    const handleSelectedSlot = (item) => {
        const startDate = (sessionData.selectedDate + " " + item.time)
        const slotId = item._id
        const transactionData = {
            "DoctorId": sessionData.doctorId,
            "ClinicId": sessionData.session.clinicId,
            "slotId": slotId,
            "patientId": patientId,
            "dependentId": dependentId !== " " ? dependentId : null,
            "transactionId": '123',
            "currency": 'INR',
            "fees": sessionData.session.fees,
            "date": sessionData.slotDate,
            "day": sessionData.session.day,
            "slotTime": item.time,
            "daySlotId": sessionData.session._id,
            "selectedDate": sessionData.selectedDate,
            "timeSlot": sessionData.session.timeSlot,
            "startDate": startDate,
            "status": "Ongoing",
            "payment": "hold"
        }
        console.log('==========transactionData', transactionData)
        paymentInfo(transactionData)
            .then((res) => {
                console.log('==========resssssss', res)
                setDependentsId(" ")
                handleClose()
            })
    }
    const handleClick = (item, e) => {
        e.preventDefault();
        navigate("booking")
        setDependentsId(item._id)
    }
    return (
        <>
            {fetchPatientData.length !== 0 ?
                <div className="col-md-6 mb-2">
                    <div className="box_general_4 cart patientDetails">
                        {fetchPatientData ?
                            <>
                                <div className="underline">
                                    <div className="form_title">
                                        <h3>dependent Details</h3>
                                    </div>
                                </div>
                                <div className="patientDataStyle">
                                    {fetchPatientData.map((item, i) => {
                                        return (
                                            <div key={i} className="row">
                                                <div className='col-md-7'>
                                                    {item.name}
                                                </div>
                                                <div className='col-md-5' align='right'>
                                                    <Link onClick={() => handleShow(slotItem)} className="btn">
                                                        <i className="arrow_carrot-right_alt" style={{ fontSize: 20 }}></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                            :
                            null}
                    </div>
                </div>
                : null}
                  <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">You Want To Book This Slot. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(slotItem)}>
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